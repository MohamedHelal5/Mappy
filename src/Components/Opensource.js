import './LeafletMap.css';
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, LayerGroup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import React, { useState } from 'react';

function Opensource() {
    const [layerNames, setLayerNames] = useState(''); // حالة لتخزين أسماء الطبقات
    const [showLayers, setShowLayers] = useState([]); // حالة لعرض الطبقات على الخريطة
    const [wmsLayerUrl, setWmsLayerUrl] = useState('http://localhost:8080/geoserver/wms');

    const [alertMessage, setAlertMessage] = useState(''); // حالة للتنبيه
    const [alertColor, setAlertColor] = useState(''); // حالة للون التنبيه
    const [isDataLoaded, setIsDataLoaded] = useState(false); // حالة للتحقق من تحميل البيانات

    // دالة تنفيذ عملية تحميل البيانات عند النقر على الزر
    const handleLoadData = () => {
        // تحقق من وجود قيم في layerNames
        if (layerNames.trim() === '') {
            setAlertMessage('يجب إدخال اسم الطبقة');
            setAlertColor('red');
            return; // انهي التنفيذ هنا إذا لم يتم إدخال أي اسم للطبقة
        }
        // تحويل النص إلى مصفوفة من الأسماء
        const layerNamesArray = layerNames.split(',');
        // عرض الطبقات على الخريطة
        setShowLayers(layerNamesArray);
        setAlertMessage('تم ظهور البيانات بنجاح على الخريطة');
        setAlertColor('green');
        setIsDataLoaded(true);
    };

    // // دالة لإضافة الطبقة إلى القائمة
    const addLayer = () => {
        const newLayerName = prompt("الرجاء إدخال اسم الطبقة:");
        if (newLayerName) {
            setShowLayers([...showLayers, newLayerName]);
        }
    };

    return (
        <>
            <div className='row'>
                <Navbar />
                <div className='col-3'>
                    <Sidebar />
                </div>
                <div className='col-9'>
                    <div className="product">
                        <div className='open-title'>
                            <div className="home-open">
                                <span>O</span>
                                <span>p</span>
                                <span>e</span>
                                <span>n</span>
                                <span style={{ paddingLeft: '5px' }}>S</span>
                                <span>o</span>
                                <span>u</span>
                                <span>r</span>
                                <span>c</span>
                                <span>e</span>
                            </div>
                            <p>Seamlessly showcase data from GeoServer by easily inputting layer names in various formats.</p>
                        </div>
                        <MapContainer center={[30.033333, 31.233334]} zoom={7} style={{ width: '100%', height: '400px' }}>
                            <LayersControl position="topright" collapsed={false}>
                                <LayersControl.BaseLayer checked name="Base Layer">
                                    <TileLayer
                                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        maxZoom={19}
                                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer checked name="Esri World Imagery">
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        maxZoom={19}
                                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer checked name="Esri World Street Map">
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                                        maxZoom={19}
                                        attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.Overlay checked name="WMS Layers">
                                    {showLayers.map((layerName, index) => (
                                        <WMSTileLayer
                                            key={index}
                                            url={wmsLayerUrl}
                                            layers={layerName}
                                            format="image/png"
                                            transparent={true}
                                        />
                                    ))}
                                </LayersControl.Overlay>
                            </LayersControl>
                        </MapContainer>
                        <div className='data'>
                            <div className='one'>
                                <button onClick={handleLoadData} id="showGeoServerData" className="btn btn-success btn-sm">Load GeoServer Data</button>
                                <input
                                    className='data-inpu'
                                    type="text"
                                    placeholder="اسم الطبقة"
                                    value={layerNames}
                                    onChange={(e) => setLayerNames(e.target.value)}
                                />
                            </div>
                            <div className='two'>
                                <button onClick={addLayer} id="data-btn" className="btn btn-primary btn-sm">ِAdd Layer</button>
                            </div>
                        </div>
                        {alertMessage && <div style={{ color: alertColor }} className="alert alert-success">{alertMessage}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Opensource }