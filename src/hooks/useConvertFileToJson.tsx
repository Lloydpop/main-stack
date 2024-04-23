import Papa from "papaparse";
import { useCallback, useState } from "react";
import * as xlsx from "xlsx";

interface FileConverterResult {
  file: File | null;
  rows: string[];
  columns: any[];
  convertFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFile: () => void;
  jsonArray: any[];
  convertJsontoCSV: (json: any[]) => string;
  convertJsonToExcel: (json: any[]) => void;
}

export const useConvertFileToJson = (): FileConverterResult => {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<string[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [jsonArray, setJsonArray] = useState<any[]>([]);

  const convertCsvToJson = useCallback((file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = Object.keys(results.data[0] ?? {});
        const columnsArray = results.data.map((d: any) => Object.values(d));
        setRows(rowsArray);
        setColumns(columnsArray);
        setJsonArray(results.data);
      },
      error: function (error) {
        alert("Error parsing CSV: " + error.message);
      },
    });
  }, []);

  const convertXlsToJson = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;
      const workbook = xlsx.read(data as ArrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      json.forEach((item: any, index: number) => {
        item.id = index + 1;
      });
      setJsonArray(json);
      const headers = Object.keys(json[0] ?? {});
      setRows(headers);

      const columnsArray = json.map((d: any) => {
        return Object.values(d);
      });
      if (columnsArray.length <= 0) {
        alert("No data found in the file");
      }
      setColumns(columnsArray);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const convertFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;
      setFile(selectedFile);
      if (
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        convertXlsToJson(selectedFile);
      } else if (selectedFile.type === "text/csv") {
        convertCsvToJson(selectedFile);
      } else {
        alert("Invalid file format");
      }
    },
    [convertCsvToJson, convertXlsToJson]
  );

  const clearFile = useCallback(() => {
    setFile(null);
    setRows([]);
    setColumns([]);
    setJsonArray([]);
  }, []);

  const convertJsontoCSV = (json: any[]) => {
    const csv = Papa.unparse(json);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "transaction.csv");
    document.body.appendChild(a);
    a.click();
    return csv;
  };

  const convertJsonToExcel = (json: any[]) => {
    const worksheet = xlsx.utils.json_to_sheet(json);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/vnd.ms-excel" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "transactions.xlsx");
    document.body.appendChild(a);
    a.click();
    return excelBuffer;
  };

  return {
    file,
    rows,
    columns,
    convertFile,
    clearFile,
    jsonArray,
    convertJsontoCSV,
    convertJsonToExcel,
  };
};
