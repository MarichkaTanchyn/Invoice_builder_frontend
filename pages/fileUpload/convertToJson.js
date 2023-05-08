import csvtojson from 'csvtojson';

const convertCsvToJson = async (inputFile) => {
  try {
    const fileData = inputFile.toString('utf-8');
    const jsonArray = await csvtojson().fromString(fileData);

    jsonArray.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!item[key]) {
          item[key] = '';
        }
      });
    });

    // await fs.promises.writeFile("/uploads", JSON.stringify(jsonArray, null, 2));
    console.log('CSV/XLSX file has been converted to JSON successfully!');
    console.log(jsonArray);
    // return jsonArray;
  } catch (error) {
    console.error('An error occurred while converting the file:', error);
  }
};

export default convertCsvToJson;