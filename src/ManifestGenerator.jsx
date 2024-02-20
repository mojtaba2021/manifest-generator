import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlightjs-copy/styles/highlightjs-copy.css';

// Load the JSON language syntax highlighting
import json from 'highlight.js/lib/languages/json';
import CopyButtonPlugin from 'highlightjs-copy';
function ManifestGenerator() {
    const [formData, setFormData] = useState({
        name: '',
        shortName: '',
        themeColor: '',
        backgroundColor: '',
        displayMode: '',
        orientation: '',
        applicationScope: '',
        startUrl: ''
        // Add more fields as needed
    });
    const manifestJson = () => {
        const manifest = {
            name: formData.name,
            short_name: formData.shortName,
            theme_color: formData.themeColor,
            background_color: formData.backgroundColor,
            display: formData.displayMode,
            orientation: formData.orientation,
            scope: formData.applicationScope,
            start_url: formData.startUrl,
            // Add more fields as needed
        };
        return JSON.stringify(manifest, null, 2)
    };
    useEffect(() => {
        hljs.addPlugin(
            new CopyButtonPlugin({
                hook: (_, el) => {
                    return (el.textContent);
                },
            })
        );
        return () => {
            hljs.removePlugin(CopyButtonPlugin);
        }
    }, [])
    useEffect(() => {
        // Highlight code on component mount
        hljs.highlightAll();
        hljs.configure({ ignoreUnescapedHTML: true })
        document.getElementById('code-preview').removeAttribute('data-highlighted');

    }, [formData]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Generate manifest object based on formData

    const generateManifest = (e) => {
        e.preventDefault();



        // Create a Blob object from the JSON string
        const blob = new Blob([manifestJson()], { type: 'application/json' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'manifest.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <>
            <div style={{ textAlign: 'center' ,margin:'30px 0'}}>
                <h1>Manifest Generator</h1>
            </div>
            <div className='container'>


                <div className='manifest-form-container '>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        Short Name:
                        <input type="text" name="shortName" value={formData.shortName} onChange={handleChange} />
                    </label>
                    <label>
                        Theme Color:
                        <input type="text" name="themeColor" value={formData.themeColor} onChange={handleChange} />
                    </label>
                    <label>
                        Background Color:
                        <input type="text" name="backgroundColor" value={formData.backgroundColor} onChange={handleChange} />
                    </label>
                    <label>
                        Display Mode:
                        <input type="text" name="displayMode" value={formData.displayMode} onChange={handleChange} />
                    </label>
                    <label>
                        Orientation:
                        <input type="text" name="orientation" value={formData.orientation} onChange={handleChange} />
                    </label>
                    <label>
                        Application Scope:
                        <input type="text" name="applicationScope" value={formData.applicationScope} onChange={handleChange} />
                    </label>
                    <label>
                        Start Url:
                        <input type="text" name="startUrl" value={formData.startUrl} onChange={handleChange} />
                    </label>
                </div>
                <div className="code-display">
                    <pre >
                        <code id="code-preview" className="hljs language-json" >
                            {manifestJson()}

                        </code>
                    </pre>
                </div>
            </div>
            <div className='button-container'>

                <button style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }} onClick={generateManifest}>Generate Manifest</button>
            </div>
        </>
    );
}

export default ManifestGenerator;
