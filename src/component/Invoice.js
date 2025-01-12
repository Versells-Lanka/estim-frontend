import { Table, TD, TR } from "@ag-media/react-pdf-table";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  invoiceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "25px 2%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingBottom: 20,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },

  part1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: "#00bf63",
    height: 100,
  },
  part1Image: {
    width: 90,
    height: 90,
  },

  companyName: {
    margin: 10,
    color: "white",
    fontSize: 26,
    fontWeight: "heavy",
  },

  registrationName: {
    textAlign: "center",
    fontSize: 8,
    color: "#000",

    marginLeft: 35,
  },

  companyDetails: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },

  textBold: {
    fontFamily: "Helvetica-Bold",
  },

  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  spaceYR: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  spaceX: {
    display: "flex",
    flexDirection: "row",
    gap: "2px",
  },

  part2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    marginTop: 15,
  },

  greenBox: {
    backgroundColor: "#00bf63",

    width: 32,

    height: 15,
  },
  part2Title: {
    fontWeight: "Helvetica-Bold",
    fontSize: 16,
  },

  part3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,

    paddingLeft: 36,
    paddingRight: 35,
  },
  part3Left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    fontSize: 11,
    paddingBottom: 10,
    paddingTop: 10,
  },
  part3Right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    fontSize: 11,
    paddingBottom: 10,
  },

  part3Right1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "5px",
  },

  estimateFont: {
    fontWeight: "bold",

    paddingLeft: 36,

    fontSize: "13px",
    paddingBottom: 8,
  },

  part3Bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingLeft: 30,
    paddingRight: 40,

    fontSize: 10,
    fontWeight: "lighter",
    gap: 5,
    width: "100%",
    marginBottom: 8,
    marginLeft: 10,
    color: "#2e2e2e",
  },
  part3BottomItem: {
    display: "flex",
    gap: 5,
  },
  part4: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  invoiceTable: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 5,
    marginTop: 5,
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    color: "#000",
    border: "1px solid #ccc",
    fontSize: 10,
    padding: 4,
    flex: 1,
  },
  tableCellCenter: {
    border: "1px solid #ccc",
    fontSize: 10,
    padding: 4,
    flex: 1,
  },
  tableCellLeft: {
    border: "1px solid #ccc",
    fontSize: 10,
    padding: 4,
    flex: 1,
  },
  tableImage: {
    width: 40,
    height: 40,
    objectFit: "contain",
    margin: "auto",
  },
  part5: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  part5Left: {
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
    width: "50%",
    fontSize: 10,
  },
  payment: {
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    gap: 5,
  },
  part5Right: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    fontSize: 10,
  },
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  cellLeft: {
    flex: 1,
    fontSize: 10,
  },
  cellRight: {
    flex: 1,
    textAlign: "right",
    fontSize: 10,
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  grandTotalRow: {
    backgroundColor: "#00bf63",
    color: "#fff",
    fontWeight: "bold",
    padding: 5,
    borderRadius: 2,
  },
  part6: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    flexDirection: "column",
    paddingLeft: 28,
    paddingRight: 28,
    fontSize: 11,
    width: "100%",
    marginTop: 40,
    marginBottom: 10,
  },
  part6Bottom: {
    display: "flex",
    justifyContent: "space-between",

    fontSize: 10,
    flexDirection: "row",
  },
  part6BottomFooter: {
    display: "flex",
    justifyContent: "space-between",

    fontSize: 16,
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
  },
  icon: {
    height: 10,
    width: 10,
    color: "#00bf63",
    marginRight: 5,
  },

  iconLine: {
    display: "flex",
    flexDirection: "row",
  },

  contactText: {
    margin: 0,
    lineHeight: 1.4,
  },

  horizontalLine: {
    height: 0.5,
    backgroundColor: "#7575746b",
    marginBottom: 15,
  },

  textareaHidden: {
    border: "none",
    outline: "none",
    width: "100%",
    resize: "none",
    fontSize: "inherit",
    fontFamily: "inherit",
    backgroundColor: "transparent",
  },
  pageNumber: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
});
const splitIntoChunks = (data, firstPageCount, subsequentPageCount) => {
  const pages = [];
  pages.push(data.slice(0, firstPageCount));
  for (let i = firstPageCount; i < data.length; i += subsequentPageCount) {
    pages.push(data.slice(i, i + subsequentPageCount));
  }
  return pages;
};

const Invoice = (props) => {
  const {
    customerNo,
    customerName,
    date,
    address,
    perimeter,
    noOfLines,
    noOfCorners,
    noOfGates,
    fenceType,
    fencePostGap,
    invoiceItems,
    subTotal,
    discount,
    total,
    paid,
    balance,
    bankName,
    accountNo,
    name,
    description1,
    description2,
    description3,
    description4,
  } = props;

  const rowsPerFirstPage = 6;
  const rowsPerSubsequentPage = 8;

  const pages = splitIntoChunks(
    invoiceItems,
    rowsPerFirstPage,
    rowsPerSubsequentPage
  );

  return (
    <Document>
      {pages.map((pageItems, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
          {/* Header */}
          <View style={styles.part1}>
            <View style={styles.companyDetails}>
              <Text style={[styles.companyName, styles.textBold]}>
                VERSELLS LANKA (PVT) LTD
              </Text>
              <Text style={styles.registrationName}>
                Registration No: PV 00234182
              </Text>
            </View>
            <Image style={styles.part1Image} src="/images/final01-bw.png" />
          </View>

          {/* Other Details */}
          {pageIndex === 0 && (
            <>
              {/* Estimate Header */}
              <View style={styles.part2}>
                <View style={styles.greenBox}></View>
                <Text style={[styles.textBold, styles.part2Title]}>
                  Estimate
                </Text>
              </View>

              {/* Customer Details */}
              <View style={styles.part3}>
                <View style={[styles.part3Left, styles.spaceY]}>
                  <Text>To:</Text>
                  <Text style={styles.textBold}>{customerName}</Text>
                  <Text>{address}</Text>
                </View>
                <View style={[styles.part3Right, styles.spaceYR]}>
                  <View style={styles.part3Right1}>
                    <Text style={styles.textBold}>Customer No:</Text>
                    <Text>{customerNo}</Text>
                  </View>
                  <View style={styles.part3Right1}>
                    <Text style={styles.textBold}>Date:</Text>
                    <Text>{date}</Text>
                  </View>
                </View>
              </View>

              {/* Estimate Details */}
              <View>
                <Text style={[styles.textBold, styles.estimateFont]}>
                  Estimate Details:
                </Text>
                <View style={[styles.spaceY, styles.part3Bottom]}>
                  <View style={styles.part3BottomItem}>
                    <Text>Perimeter (in feet): {perimeter}</Text>
                    <Text>Number of lines: {noOfLines}</Text>
                  </View>
                  <View style={styles.part3BottomItem}>
                    <Text>Number of corners: {noOfCorners}</Text>
                    <Text>Number of gates: {noOfGates}</Text>
                  </View>
                  <View style={styles.part3BottomItem}>
                    <Text>Fence Post Gap: {fencePostGap}</Text>
                    <Text>Fence Type: {fenceType}</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {/* Invoice Table */}
          <View style={styles.part4}>
            <Table style={styles.invoiceTable}>
              <TR>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 0.3, textAlign: "center" },
                  ]}
                >
                  No
                </TD>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 2.4, justifyContent: "center" },
                  ]}
                >
                  Item Name
                </TD>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 0.8, justifyContent: "center" },
                  ]}
                >
                  Item Image
                </TD>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 3.7, justifyContent: "center" },
                  ]}
                >
                  Description
                </TD>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 0.6, justifyContent: "center" },
                  ]}
                >
                  Qty
                </TD>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 0.5, justifyContent: "center" },
                  ]}
                >
                  Unit
                </TD>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 1, justifyContent: "center" },
                  ]}
                >
                  Price/Unit
                </TD>
                <TD
                  style={[
                    styles.tableHeader,
                    styles.textBold,
                    { flex: 1, justifyContent: "center" },
                  ]}
                >
                  Amount
                </TD>
              </TR>
              {pageItems.map((item, index) => (
                <TR key={index}>
                  <TD
                    style={[
                      styles.tableCellCenter,
                      { flex: 0.3, justifyContent: "center" },
                    ]}
                  >
                    {index +
                      1 +
                      pageIndex * rowsPerFirstPage +
                      (pageIndex > 0
                        ? (pageIndex - 1) * rowsPerSubsequentPage
                        : 0)}
                  </TD>
                  <TD
                    style={[
                      styles.tableCellLeft,
                      { flex: 2.4, textAlign: "left" },
                    ]}
                  >
                    {item.itemName}
                  </TD>
                  <TD style={[styles.tableCellCenter, { flex: 0.8 }]}>
                    <Image style={styles.tableImage} src={item.imageUrl} />
                  </TD>
                  <TD
                    style={[
                      styles.tableCellLeft,
                      { flex: 3.7, textAlign: "left" },
                    ]}
                  >
                    {item.description}
                  </TD>
                  <TD
                    style={[
                      styles.tableCellCenter,
                      { flex: 0.6, justifyContent: "flex-end" },
                    ]}
                  >
                    {item.quantity}
                  </TD>
                  <TD
                    style={[
                      styles.tableCellCenter,
                      { flex: 0.5, justifyContent: "flex-end" },
                    ]}
                  >
                    {item.itemUnit}
                  </TD>
                  <TD
                    style={[
                      styles.tableCellCenter,
                      { flex: 1, justifyContent: "flex-end" },
                    ]}
                  >
                    {item.unitPrice}
                  </TD>
                  <TD
                    style={[
                      styles.tableCellCenter,
                      { flex: 1, justifyContent: "flex-end" },
                    ]}
                  >
                    {item.amount}
                  </TD>
                </TR>
              ))}
            </Table>
          </View>

          {/* Footer */}
          {pageIndex === pages.length - 1 && (
            <View>
              <View style={styles.part5}>
                {/* Left Section */}
                <View style={styles.part5Left}>
                  <View>
                    <Text style={[styles.boldText, styles.textBold]}>
                      Payment Method
                    </Text>
                    <View style={styles.payment}>
                      <Text>{bankName}</Text>
                      <Text>{accountNo}</Text>
                      <Text>{name}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.boldText, styles.textBold]}>
                      Description
                    </Text>
                    <View style={styles.payment}>
                      <Text>{description1}</Text>
                      <Text>{description2}</Text>
                      <Text>{description3}</Text>
                      <Text>{description4}</Text>
                    </View>
                  </View>
                </View>

                {/* Right Section */}
                <View style={styles.part5Right}>
                  <View style={styles.table}>
                    <View style={styles.row}>
                      <Text style={styles.cellLeft}>
                        <Text style={styles.boldText}>Sub Total</Text>
                      </Text>
                      <Text style={styles.cellRight}>Rs. {subTotal}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.cellLeft}>
                        <Text style={styles.boldText}>Discount</Text>
                      </Text>
                      <Text style={styles.cellRight}>Rs. {discount}</Text>
                    </View>
                    <View style={[styles.row, styles.grandTotalRow]}>
                      <Text style={styles.cellLeft}>
                        <Text style={styles.boldText}>GRAND TOTAL</Text>
                      </Text>
                      <Text style={styles.cellRight}>Rs. {total}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.cellLeft}>
                        <Text style={styles.boldText}>Paid</Text>
                      </Text>
                      <Text style={styles.cellRight}>Rs. {paid}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.cellLeft}>
                        <Text style={styles.boldText}>Balance</Text>
                      </Text>
                      <Text style={styles.cellRight}>Rs. {balance}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.part6} fixed>
            <View style={styles.horizontalLine}></View>
            <View style={styles.part6Bottom}>
              <View style={styles.contact}>
                <View style={styles.spaceYR}>
                  <View style={styles.iconLine}>
                    <Image style={styles.icon} src="../images/Phone1.png" />
                    <Text style={styles.textBold}>Phone </Text>
                  </View>
                  <Text>0743434345</Text>
                </View>
              </View>
              <View style={styles.contact}>
                <View style={styles.spaceYR}>
                  <View style={styles.iconLine}>
                    <Image style={styles.icon} src="../images/mail1.png" />
                    <Text style={styles.textBold}>Mail </Text>
                  </View>
                  <Text>info@versellslanka.com</Text>
                </View>
              </View>
              <View style={styles.contact}>
                <View style={styles.spaceYR}>
                  <View style={styles.iconLine}>
                    <Image style={styles.icon} src="../images/location1.png" />
                    <Text style={styles.textBold}>Address</Text>
                  </View>
                  <View style={styles.spaceY}>
                    <Text>155/5 Karuwalagahawaththa</Text>
                    <Text>Maho</Text>
                    <Text>Kurunegala</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.pageNumber}>
              {pageIndex + 1} of {pages.length}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default Invoice;
