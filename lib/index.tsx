import http from 'http';
import React, { useEffect, useState } from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = async (): Promise<JSX.Element> => {
  const data = await QRCode.toDataURL('http://hello.world');
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Fellipe</Text>
        </View>
        <View style={styles.section}>
          <Text>Ivan</Text>
        </View>
        <View style={styles.section}>
          <Image src={data} />
        </View>
      </Page>
    </Document>
  );
};

const server = http
  .createServer(async (req: any, res: any) => {
    res.writeHead(200, { 'Content-Type': 'application/pdf' });
    let stream = await ReactPDF.renderToStream(await MyDocument());
    stream.pipe(res);
  })
  .listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

export default server;
