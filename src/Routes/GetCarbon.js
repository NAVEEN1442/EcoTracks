import React, { useState, useEffect } from 'react';
import { Upload, FileText, Moon, Sun, Copy, Check, Receipt } from 'lucide-react';

// We'll use the Tesseract.js library for OCR
// Note: In a real implementation, you would need to add this to your dependencies
const ImageToTextExtractor = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analyzedBillData, setAnalyzedBillData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [extractionMode, setExtractionMode] = useState('text');
  const [tesseractLoaded, setTesseractLoaded] = useState(false);
  
  // Load Tesseract.js from CDN
  useEffect(() => {
    const loadTesseract = async () => {
      // We're using a script tag to load Tesseract from CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/2.1.5/tesseract.min.js';
      script.async = true;
      script.onload = () => setTesseractLoaded(true);
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    };
    
    loadTesseract();
  }, []);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      
      // Reset extracted data when new file is uploaded
      setExtractedText('');
      setAnalyzedBillData(null);
    }
  };
  
  // Function to parse bill details from raw text
  const parseBillDetails = (text) => {
    // This is a simple implementation - would need more sophisticated
    // pattern matching for real-world bills
    const data = {
      vendor: 'Unknown',
      billNumber: 'Unknown',
      date: 'Unknown',
      dueDate: 'Unknown',
      amount: 0,
      taxAmount: 0,
      totalAmount: 0,
      items: []
    };
    
    // Extract vendor - often first lines of text
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      data.vendor = lines[0].trim();
    }
    
    // Look for invoice/bill number (patterns like INV-xxxx, #xxxx)
    const invoiceMatch = text.match(/inv[^a-zA-Z0-9]?(\d+[-\s]?\d+)/i) || 
                          text.match(/invoice[^a-zA-Z0-9]?(\d+[-\s]?\d+)/i) ||
                          text.match(/bill[^a-zA-Z0-9]?(\d+[-\s]?\d+)/i) ||
                          text.match(/#\s?(\d+[-\s]?\d+)/);
    if (invoiceMatch) {
      data.billNumber = invoiceMatch[1];
    }
    
    // Look for dates
    const dateMatches = text.match(/(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})/g) || 
                         text.match(/(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})/gi);
    if (dateMatches && dateMatches.length > 0) {
      data.date = dateMatches[0];
      if (dateMatches.length > 1) {
        data.dueDate = dateMatches[1];
      }
    }
    
    // Extract total amount - look for patterns like "Total: $123.45"
    const totalMatch = text.match(/total[^a-zA-Z0-9$]*\$?\s*(\d+[.,]\d+)/i) ||
                       text.match(/amount\s+due[^a-zA-Z0-9$]*\$?\s*(\d+[.,]\d+)/i) ||
                       text.match(/total\s+amount[^a-zA-Z0-9$]*\$?\s*(\d+[.,]\d+)/i);
    if (totalMatch) {
      data.totalAmount = parseFloat(totalMatch[1].replace(',', ''));
    }
    
    // Look for subtotal
    const subtotalMatch = text.match(/subtotal[^a-zA-Z0-9$]*\$?\s*(\d+[.,]\d+)/i);
    if (subtotalMatch) {
      data.amount = parseFloat(subtotalMatch[1].replace(',', ''));
    }
    
    // Look for tax
    const taxMatch = text.match(/tax[^a-zA-Z0-9$]*\$?\s*(\d+[.,]\d+)/i) ||
                     text.match(/vat[^a-zA-Z0-9$]*\$?\s*(\d+[.,]\d+)/i) ||
                     text.match(/gst[^a-zA-Z0-9$]*\$?\s*(\d+[.,]\d+)/i);
    if (taxMatch) {
      data.taxAmount = parseFloat(taxMatch[1].replace(',', ''));
    }
    
    // If we have total but no subtotal, try to calculate it
    if (data.totalAmount > 0 && data.amount === 0 && data.taxAmount > 0) {
      data.amount = data.totalAmount - data.taxAmount;
    }
    
    // Extract line items - this is a simplified approach
    // Find possible line items by looking for dollar amounts
    const possibleItems = [];
    const itemRegex = /([A-Za-z\s]+)\s+\$?(\d+[.,]\d+)/g;
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
      const description = match[1].trim();
      const amount = parseFloat(match[2].replace(',', ''));
      
      // Skip if this looks like a total or tax line
      if (!/total|tax|subtotal|amount due/i.test(description)) {
        possibleItems.push({ description, amount });
      }
    }
    
    // Only include items that seem reasonable (not headers or other text)
    data.items = possibleItems.filter(item => 
      item.description.length > 2 && 
      item.description.length < 50 &&
      item.amount > 0 &&
      item.amount < data.totalAmount * 1.5 // Sanity check
    );
    
    return data;
  };
  
  const processImage = async () => {
    if (!file || !tesseractLoaded || !window.Tesseract) {
      alert("Please wait for OCR library to load or select an image");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await window.Tesseract.recognize(
        preview,
        'eng', // English language
        { 
          logger: m => console.log(m),
        }
      );
      
      const extractedText = result.data.text;
      setExtractedText(extractedText);
      
      // If in bill mode, analyze the text to extract structured data
      if (extractionMode === 'bill') {
        const billData = parseBillDetails(extractedText);
        setAnalyzedBillData(billData);
      }
    } catch (err) {
      console.error("OCR Error:", err);
      setExtractedText("Error processing image. Please try a clearer image.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (extractionMode === 'text' || !analyzedBillData) {
      navigator.clipboard.writeText(extractedText);
    } else {
      navigator.clipboard.writeText(JSON.stringify(analyzedBillData, null, 2));
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bill Image Analyzer</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-blue-800'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        
        {/* OCR Status */}
        {!tesseractLoaded && (
          <div className={`p-4 rounded-lg mb-4 text-center ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
            Loading OCR engine... Please wait.
          </div>
        )}
        
        {/* Upload Section */}
        <div className={`p-6 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Upload Bill Image</h2>
          
          <div className={`border-2 border-dashed rounded-lg p-8 text-center ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            {preview ? (
              <div className="mb-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <Upload size={48} className={`mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className="mb-2">Drag and drop an image of your bill, or click to select</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  For best results, use a clear image with good lighting
                </p>
              </div>
            )}
            
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center">
              <label 
                htmlFor="image-upload" 
                className={`px-4 py-2 rounded cursor-pointer ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {preview ? 'Change Image' : 'Select Image'}
              </label>
              
              {preview && (
                <div className="flex mt-4 sm:mt-0 sm:ml-4">
                  <div className="flex rounded overflow-hidden">
                    <button
                      onClick={() => setExtractionMode('text')}
                      className={`px-3 py-2 flex items-center ${
                        extractionMode === 'text'
                          ? darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                          : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <FileText size={16} className="mr-1" />
                      Raw Text
                    </button>
                    <button
                      onClick={() => setExtractionMode('bill')}
                      className={`px-3 py-2 flex items-center ${
                        extractionMode === 'bill'
                          ? darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                          : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <Receipt size={16} className="mr-1" />
                      Analyze Bill
                    </button>
                  </div>
                  
                  <button 
                    onClick={processImage}
                    disabled={isLoading || !tesseractLoaded}
                    className={`ml-2 px-4 py-2 rounded flex items-center ${
                      darkMode 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    } ${(isLoading || !tesseractLoaded) ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Processing...' : 'Extract'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        {extractedText && (
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {extractionMode === 'bill' ? 'Analyzed Bill Data' : 'Extracted Text'}
              </h2>
              <button 
                onClick={copyToClipboard}
                className={`px-3 py-1 rounded flex items-center text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {copied ? <Check size={16} className="mr-1 text-green-500" /> : <Copy size={16} className="mr-1" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            {/* Bill details visualization */}
            {extractionMode === 'bill' && analyzedBillData && (
              <div className="mb-6">
                <div className={`rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div>
                    <h3 className="font-medium mb-2">Bill Information</h3>
                    <div className="space-y-2">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vendor</p>
                        <p>{analyzedBillData.vendor || 'Not detected'}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bill/Invoice Number</p>
                        <p>{analyzedBillData.billNumber || 'Not detected'}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</p>
                        <p>{analyzedBillData.date || 'Not detected'}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Due Date</p>
                        <p>{analyzedBillData.dueDate || 'Not detected'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Amount Information</h3>
                    <div className="space-y-2">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subtotal</p>
                        <p>{analyzedBillData.amount ? `$${analyzedBillData.amount.toFixed(2)}` : 'Not detected'}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tax</p>
                        <p>{analyzedBillData.taxAmount ? `$${analyzedBillData.taxAmount.toFixed(2)}` : 'Not detected'}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount</p>
                        <p className="font-bold">{analyzedBillData.totalAmount ? `$${analyzedBillData.totalAmount.toFixed(2)}` : 'Not detected'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Items table */}
                {analyzedBillData.items && analyzedBillData.items.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Detected Line Items</h3>
                    <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <table className="w-full">
                        <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-200'}>
                          <tr>
                            <th className="text-left py-2 px-4">Description</th>
                            <th className="text-right py-2 px-4">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analyzedBillData.items.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-700' : 'bg-white') : ''}>
                              <td className="py-2 px-4">{item.description}</td>
                              <td className="py-2 px-4 text-right">${item.amount.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Raw text output */}
            <div>
              <h3 className="font-medium mb-2">Raw Extracted Text</h3>
              <div className={`p-4 rounded max-h-64 overflow-y-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="whitespace-pre-line">{extractedText}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Upload a bill image to extract and analyze its contents using OCR technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageToTextExtractor;