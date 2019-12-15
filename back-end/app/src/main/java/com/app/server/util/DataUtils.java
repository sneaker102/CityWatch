package com.app.server.util;

import com.app.server.model.CongestionData;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.stream.Stream;

public class DataUtils {

	private static final String DIR_INPUT = "/Users/blendicavlad/Documents/Hackaton/Datasets/Vechicle Trafic/traffic_feb_june/";
	private static final String DIR_OUTPUT = "/Users/blendicavlad/Documents/Hackaton/Datasets/Vechicle Trafic/output/";
	private static final char SEPARATOR = ',';

	public static void addColumn(String columnLabel, String inputName, String outputName, String name) throws IOException {
		CSVReader reader = new CSVReader(new FileReader(DIR_INPUT + inputName));
		CSVWriter writer = new CSVWriter(new FileWriter(DIR_OUTPUT + outputName + ".csv"), SEPARATOR);
		String[] entries = null;
		int index = 0;
		while ((entries = reader.readNext()) != null) {
			index ++;
			ArrayList<String> list = new ArrayList<>(Arrays.asList(entries));
			if(index == 1)
				list.add(columnLabel);
			else
				if(name == null)
					list.add(getRandom(getFileToArr()));

			writer.writeNext(getStringArray(list));
		}
	}

	public static void iterateDirectory() throws Exception {
		File dir = new File(DIR_INPUT);
		File[] directoryListing = dir.listFiles();
		if (directoryListing != null) {
			int index = 0;
			for (File child : directoryListing) {
				addColumn("coord",child.getName(),String.valueOf(index), "test");
			}
		}
	}

	public static void mergeCsvs() throws Exception {
		String[] headers = null;
		String firstFile = "/Users/blendicavlad/Documents/Hackaton/Datasets/Vechicle Trafic/traffic_feb_june/trafficData158324.csv";
		Scanner scanner = new Scanner(new File(firstFile));

		if (scanner.hasNextLine())
			headers = scanner.nextLine().split(",");

		scanner.close();

		File dir = new File(DIR_INPUT);
		File[] directoryListing = dir.listFiles();
		Iterator<File> iterFiles = Stream.of(directoryListing).iterator();
		BufferedWriter writer = new BufferedWriter(new FileWriter(firstFile, true));

		while (iterFiles.hasNext()) {
			File nextFile = iterFiles.next();
			BufferedReader reader;
			reader = new BufferedReader(new FileReader(nextFile));

			String line = null;
			String[] firstLine = null;
			if ((line = reader.readLine()) != null)
				firstLine = line.split(",");

			if (!Arrays.equals (headers, firstLine))
				throw new Exception("Header mis-match between CSV files: '" +
						firstFile + "' and '" + nextFile.getAbsolutePath());

			while ((line = reader.readLine()) != null) {
				writer.write(line);
				writer.newLine();
			}

			reader.close();
		}
		writer.close();
	}

	public static String[] getStringArray(ArrayList<String> arr)
	{
		String str[] = new String[arr.size()];
		Object[] objArr = arr.toArray();
		int i = 0;
		for (Object obj : objArr) {
			str[i++] = (String)obj;
		}

		return str;
	}

	public static String[] getFileToArr() {

		String[] array = null;
		try {
			BufferedReader br = new BufferedReader(
					new FileReader("/Users/blendicavlad/Documents/Hackaton/Datasets/strazi.txt"));
			int counter = 0;
			ArrayList<String> list = new ArrayList<String>();
			for (String line; (line = br.readLine()) != null; ) {
				counter++;

				if (counter > 51) {
					line = line.trim();
					list.addAll(Arrays.asList(line.split("\\s*,\\s*")));
				}
			}

			array = new String[list.size()];
			array = list.toArray(array);

			for (int i = 0; i < array.length; i++) {
				System.out.println(array[i]);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return array;
	}

	public static String getRandom(String[] array) {
		int rnd = new Random().nextInt(array.length);
		return array[rnd];
	}

	public static List<CongestionData> run(String streetName) {

		String csvFile = "/Users/blendicavlad/Documents/Hackaton/Datasets/Vechicle Trafic/output/merged.csv" ;
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";
		List<CongestionData> congestionData = new ArrayList<>();

		try {

			br = new BufferedReader(new FileReader(csvFile));
			while ((line = br.readLine()) != null) {

				// use comma as separator
				String[] data = line.split(cvsSplitBy);

				String dataStreetName = data[9].replace("Strada","").replace("\"","").replace("'","");
				String sanitizedStreetName = streetName.replace("Strada","").replace("\"","").replace("'","");;

				if(dataStreetName.equals(sanitizedStreetName)) {
					congestionData.add(new CongestionData(
							data[9],
							Integer.parseInt(data[2].replace("\"","")),
							Integer.parseInt(data[1].replace("\"","")),
							Integer.parseInt(data[6].replace("\"","")),
							Timestamp.valueOf(data[5].replace("\"","").replace("T"," "))
					));
				}

			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		System.out.println("Done");
		return congestionData;
	}

	public static void main(String[] args) {
		try {
//			addColumn("street","merged.csv",String.valueOf(1),null);
			run("Strada Castanilor")
					.forEach(congestionData -> System.out.println(congestionData.getDate()));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

//	writer.close();
}
