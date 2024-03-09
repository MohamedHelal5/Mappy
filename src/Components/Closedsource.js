import './EsriMap.css';
import React, { useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Search from '@arcgis/core/widgets/Search';
import Sketch from '@arcgis/core/widgets/Sketch';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Fullscreen from '@arcgis/core/widgets/Fullscreen';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Measurement from '@arcgis/core/widgets/Measurement';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import LayerList from '@arcgis/core/widgets/LayerList';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';


function Closedsource() {
    const [geojsonUrl, setGeojsonUrl] = useState('');
    const [serviceUrl, setServiceUrl] = useState('');
    const [alertgeoJsonMessage, setAlertGeoJSONMessage] = useState('');
    const [alertArcServiceMessage, setAlertArcServerMessage] = useState('');

    function clearInputs() {
        setServiceUrl('');
        setGeojsonUrl('');
    }

    useEffect(() => {

        let map = new Map({
            basemap: 'streets-navigation-vector',
            layers: [new GraphicsLayer()]
        });

        // Create a view
        const view = new MapView({
            container: 'viewDiv',
            map: map,
            center: [30.062, 31.249],
            zoom: 6
        });

        const widgets = [
            {
                widget: new Search({ view: view }),
                position: 'top-right'
            },
            {
                widget: new Sketch({ view: view, layer: new GraphicsLayer() }),
                position: 'top-right'
            },
            {
                widget: new Legend({ view: view }),
                position: 'bottom-left'
            },
            {
                widget: new Fullscreen({ view: view }),
                position: 'top-right'
            },
            {
                widget: new BasemapGallery({ view: view }),
                position: 'top-right'
            },
            {
                widget: new Measurement({ view: view }),
                position: 'top-right'
            },
            {
                widget: new AreaMeasurement2D({ view: view }),
                position: 'top-right'
            },
            {
                widget: new LayerList({ view: view }),
                position: 'top-right'
            },
            {
                widget: new ScaleBar({ view: view, unit: 'dual' }),
                position: 'bottom-left'
            }
        ];

        // Add each widget to the view's UI
        widgets.forEach(({ widget, position }) => {
            view.ui.add(new Expand({ view, content: widget, expanded: false }), position);
        });

        // Event handler for the Load button
        async function handleLoadClick() {
            if (geojsonUrl) {
                try {
                    const success = await loadGeoJSONFromURL(geojsonUrl, map);
                    if (success) {
                        setAlertGeoJSONMessage('تم تحميل البيانات بنجاح.');
                    } else {
                        setAlertGeoJSONMessage('لا توجد بيانات في هذا الرابط.');
                    }
                } catch (error) {
                    setAlertGeoJSONMessage('حدث خطأ أثناء تحميل البيانات ،الرجاء إدخال رابط صالح.');
                }
            }
            else {
                setAlertGeoJSONMessage('Please enter a valid GeoJSON URL.');
            }
        }

        // Function to load GeoJSON from URL
        async function loadGeoJSONFromURL(url, map) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const geojson = await response.json();

                // Create a GeoJSON layer
                const geojsonLayer = new GeoJSONLayer({
                    url: url,
                    renderer: {
                        type: 'simple',
                        symbol: {
                            type: 'simple-marker',
                            color: 'blue',
                            size: 6,
                            outline: {
                                color: 'white',
                                width: 1
                            }
                        }
                    }
                });

                // Remove the previous layer if it exists
                const existingLayer = map.findLayerById('loadedGeoJSON');
                if (existingLayer) {
                    map.remove(existingLayer);
                }

                // Add the new layer to the map
                geojsonLayer.id = 'loadedGeoJSON';
                map.add(geojsonLayer);

                return true; // تحميل ناجح
            } catch (error) {
                return false;
            }
        }

        // Set up event listener for the Load button
        const loadButton = document.getElementById('loadButton');
        if (loadButton) {
            loadButton.addEventListener('click', handleLoadClick);
        }


        // ##############################  ArcGIS Server Service REST URL  ######################
        async function loadClick() {
            if (serviceUrl) {
                try {
                    const success = await loadArcGISService(serviceUrl, map);
                    if (success) {
                        setAlertArcServerMessage('تم تحميل البيانات بنجاح.');
                    } else {
                        setAlertArcServerMessage('لا توجد بيانات في هذا الرابط.');
                    }
                } catch (error) {
                    setAlertArcServerMessage('حدث خطأ أثناء تحميل البيانات ،الرجاء إدخال رابط صالح.');
                }
            } else {
                setAlertArcServerMessage('Please enter a valid ArcGIS service URL.');
            }
        }

        // Function to load an ArcGIS service
        async function loadArcGISService(serviceUrl, map) {

            try {
                const response = await fetch(serviceUrl);
                if (!response.ok) {
                    throw new Error('Request failed');
                }

                const mapImageLayer = new MapImageLayer({
                    url: serviceUrl,
                });

                // Remove the previous layer if it exists
                const existingLayer = map.findLayerById('loadedArcGISService');
                if (existingLayer) {
                    map.remove(existingLayer);
                }

                // Add the new layer to the map
                mapImageLayer.id = 'loadedArcGISService';
                map.add(mapImageLayer);

                if (map.findLayerById('loadedArcGISService')) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return false; // فشل عملية التحميل
            }

        }

        const loadServerDataButton = document.getElementById('loadServerDataButton');
        if (loadServerDataButton) {
            loadServerDataButton.addEventListener('click', loadClick);
        }
    }, [serviceUrl, geojsonUrl]);

    return (
        <>
            <div className='closed-title'>
                <div className="home-closed">
                    <span>C</span>
                    <span>l</span>
                    <span>o</span>
                    <span>s</span>
                    <span>e</span>
                    <span>d</span>
                    <span style={{ paddingLeft: '5px' }}>S</span>
                    <span>o</span>
                    <span>u</span>
                    <span>r</span>
                    <span>c</span>
                    <span>e</span>
                </div>
                <p>Experience a cohesive viewing platform that allows you to seamlessly view and analyze both ArcGIS Server data and GeoJSON data.</p>
            </div>
            {/* map */}
            <div className="viewDiv" id="viewDiv" ></div>
            {/* map */}

            <div className='clos-data'>
                <div className='arcserver'>
                    {/* Input For ArcServer Service REST URL */}
                    <input
                        className='arcserver-inpu'
                        type="text"
                        placeholder="Enter ArcGIS Service REST URL"
                        value={serviceUrl}
                        onChange={(e) => setServiceUrl(e.target.value)}
                    />
                    <button className='btn btn-primary btn-sm' id="loadServerDataButton">Load ArcServer Data</button>
                    {/* Alert ArcServer Msg */}
                    {alertArcServiceMessage && <div style={{ color: "green" }} className="alert alert-success">{alertArcServiceMessage}</div>}
                </div>
                <div className='geojson'>
                    {/* Input For GeoJSON URL */}
                    <input
                        className='geojson-inpu'
                        type="text"
                        placeholder="Enter GeoJSON URL"
                        value={geojsonUrl}
                        onChange={(e) => setGeojsonUrl(e.target.value)}
                    />
                    <button className='btn btn-primary btn-sm' id="loadButton">Load GeoJSON Data</button>
                    {/* Alert geoJson Msg */}
                    {alertgeoJsonMessage && <div style={{ color: "green" }} className="alert alert-success">{alertgeoJsonMessage}</div>}
                </div>
                {/* Inputs Clear Button */}
                <div className='clear'>
                    <button className='btn btn-success btn-sm' id="clr-btn" onClick={clearInputs}>Clear input</button>
                </div>
            </div>
        </>
    );
}

export { Closedsource };