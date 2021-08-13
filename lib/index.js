import http from "http";
import React from "react";
import ReactPDF from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Fellipe</Text>
      </View>
      <View style={styles.section}>
        <Text>Ivan</Text>
      </View>
    </Page>
  </Document>
);

const server = http
  .createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/pdf" });
    let stream = await ReactPDF.renderToStream(<MyDocument />);
    stream.pipe(res);
  })
  .listen(1337, "127.0.0.1");

console.log("Server running at http://127.0.0.1:1337/");

export default server;
