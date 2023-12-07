import React from 'react'
import { Document, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import images from '../../../assets/images'



const ReporteDisponible = ({ products }) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    return (
        <Document>
            <Page size="A4" wrap style={{ paddingBottom: '30px' }}>
                <View style={{ margin: '25px', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }} fixed>
                    <Image src={images.logoReporte} style={{ width: '80px' }} />
                    <View>
                        <Text style={{ fontSize: "22px" }}>
                            Reporte de productos activos y disponibles
                        </Text>
                        <Text style={{ fontSize: "10px", marginTop: '10px' }}>
                            Generado el: {hoy.toLocaleDateString()}
                        </Text>
                    </View>

                </View>
                <View style={{ width: '100%', padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    {products.map((product) => (
                        product.active && product.status ?
                        <View style={{ borderStyle: 'solid', width: '100%', height: '150px', borderColor: 'black', borderRadius: '10px', borderWidth: '2px', padding: '10px', display: 'flex', flexDirection: 'row' , gap: '10px'}} wrap={false}>
                            <View style={{ display: 'flex', flexDirection: 'column', width: '80%', gap: '20px' }}>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: "10px", fontWeight: 'bold' }}>Nombre producto: </Text>
                                    <Text style={{ fontSize: "16px" }}> {product.name} </Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: "10px", fontWeight: 'bold' }}>Categoría: </Text>
                                    <Text style={{ fontSize: "16px" }}> {product?.category[0].name} </Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: "10px", fontWeight: 'bold' }}>Proveedor: </Text>
                                    <Text style={{ fontSize: "16px" }}> {product?.provider.name} </Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
                                <Image src={product?.imagesClient[0]} style={{ width: '100%' }} />
                            </View>
                        </View>
                        : <></>
                    ))}
                </View>
                <Text wrap={false} style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});


export default ReporteDisponible