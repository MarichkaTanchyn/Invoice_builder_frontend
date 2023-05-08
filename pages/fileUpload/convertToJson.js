import csvtojson from 'csvtojson';

const convertCsvToJson = async (inputFile) => {
  try {
    console.log(inputFile)
    const fileData = inputFile.toString('utf-8');
    const lines = fileData.split('\n');
    const headers = lines[0].split('\t');

    console.log(fileData)
    console.log(lines)
    console.log(headers)


    const jsonArray = [];

    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split('\t');
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[j] || '';
      }
      jsonArray.push(obj);
    }


    console.log(jsonArray.length);
    // await fs.promises.writeFile("/uploads", JSON.stringify(jsonArray, null, 2));
    console.log('CSV/XLSX file has been converted to JSON successfully!');
    console.log(jsonArray);
    return jsonArray;
  } catch (error) {
    console.error('An error occurred while converting the file:', error);
  }
};

export default convertCsvToJson;