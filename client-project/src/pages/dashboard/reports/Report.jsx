import { Backdrop, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReporteDisponible from './ReporteDisponible'
import ReporteNoDisponible from './ReporteNoDisponible'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { setProduct } from '../../../actions/product'

const Report = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setOpenBackdrop(true);
    const data = await setProduct(dispatch);
    if (!data) {
      enqueueSnackbar('No fue posible obtener la información', { variant: 'error' });
    }
    setOpenBackdrop(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Reportes</h1>
      <p>Reporte de los productos activos y disponibles del sitio</p>
      <PDFDownloadLink document={<ReporteDisponible products={data} />} fileName='reporte.pdf'>
        <Button variant='contained'>Generar</Button>
      </PDFDownloadLink>

      <p>Reporte de los productos no disponible del sitio</p>
      <PDFDownloadLink document={<ReporteNoDisponible products={data} />} fileName='reporte.pdf'>
        <Button variant='contained'>Generar</Button>
      </PDFDownloadLink>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Report