import React, { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

const ShootingSessionUpload = () => {
  const { user } = useAuth();
  const [sessionName, setSessionName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setSuccess(false);
  };

  const parseCSV = (csvText: string) => {
    try {
      // Split the CSV into lines
      const lines = csvText.split("\n").filter((line) => line.trim());

      // Extract total score
      const totalScoreLine = lines.find((line) => line.includes("Total:"));
      const totalScoreMatch = totalScoreLine?.match(
        /Total:,([\d.]+)\s*\(([\d.]+)\)/i,
      );
      const totalScore = totalScoreMatch ? parseFloat(totalScoreMatch[1]) : 0;
      const totalScoreWithInner = totalScoreMatch
        ? parseFloat(totalScoreMatch[2])
        : 0;

      // Extract inner tens
      const innerTensLine = lines.find((line) => line.includes("Inner tens:"));
      const innerTensMatch = innerTensLine?.match(/Inner tens:\s*,+\s*(\d+)/i);
      const innerTens = innerTensMatch ? parseInt(innerTensMatch[1]) : 0;

      // Extract series totals
      const seriesTotalsLine = lines.find((line) =>
        line.includes("Series totals:"),
      );
      const seriesTotalsMatch = seriesTotalsLine?.match(
        /Series totals:,([\d\s]+)/i,
      );
      const seriesTotals = seriesTotalsMatch ? seriesTotalsMatch[1].trim() : "";

      // Extract MPI
      const mpiLine = lines.find(
        (line) => line.includes("MPI:") && !line.includes("Series"),
      );
      const mpiMatch = mpiLine?.match(
        /MPI:,X:\s*([\-\d.]+)\s*mm;\s*Y:\s*([\-\d.]+)\s*mm/i,
      );
      const mpiX = mpiMatch ? parseFloat(mpiMatch[1]) : 0;
      const mpiY = mpiMatch ? parseFloat(mpiMatch[2]) : 0;

      // Extract group size
      const groupSizeLine = lines.find(
        (line) => line.includes("Group size:") && !line.includes("Series"),
      );
      const groupSizeMatch = groupSizeLine?.match(
        /Group size:,Ø:\s*([\d.]+)\s*mm/i,
      );
      const groupSize = groupSizeMatch ? parseFloat(groupSizeMatch[1]) : 0;

      // Extract series data
      const seriesData = [];
      let currentSeries: any = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Start of a new series
        if (line.match(/Series\s+\d+:/) || line.match(/Series\s+\d+P:/)) {
          if (currentSeries) {
            seriesData.push(currentSeries);
          }

          const seriesMatch = line.match(/Series\s+(\d+[P]?):,(.+)/);
          if (seriesMatch) {
            const seriesNumber = seriesMatch[1].replace("P", "");
            const shots = seriesMatch[2]
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s);

            currentSeries = {
              series_number: parseInt(seriesNumber),
              shots: shots.join(","),
              series_total: 0,
              mpi_x: 0,
              mpi_y: 0,
              group_size: 0,
            };
          }
        }
        // Series total
        else if (line.includes("Series total:") && currentSeries) {
          const totalMatch = line.match(
            /Series total:,([\d.]+)\s*\(([\d.]+)\)/i,
          );
          if (totalMatch) {
            currentSeries.series_total = parseFloat(totalMatch[1]);
          }
        }
        // MPI for series
        else if (
          line.includes("MPI:") &&
          currentSeries &&
          !line.includes("Series")
        ) {
          const mpiMatch = line.match(
            /MPI:,X:\s*([\-\d.]+)\s*mm;\s*Y:\s*([\-\d.]+)\s*mm/i,
          );
          if (mpiMatch) {
            currentSeries.mpi_x = parseFloat(mpiMatch[1]);
            currentSeries.mpi_y = parseFloat(mpiMatch[2]);
          }
        }
        // Group size for series
        else if (
          line.includes("Group size:") &&
          currentSeries &&
          !line.includes("Series")
        ) {
          const groupSizeMatch = line.match(/Group size:,Ø:\s*([\d.]+)\s*mm/i);
          if (groupSizeMatch) {
            currentSeries.group_size = parseFloat(groupSizeMatch[1]);
          }
        }
      }

      // Add the last series if it exists
      if (currentSeries) {
        seriesData.push(currentSeries);
      }

      return {
        total_score: totalScore,
        inner_tens: innerTens,
        series_totals: seriesTotals,
        mpi_x: mpiX,
        mpi_y: mpiY,
        group_size: groupSize,
        series: seriesData,
      };
    } catch (error) {
      console.error("Error parsing CSV:", error);
      throw new Error("Failed to parse CSV file. Please check the format.");
    }
  };

  const handleUpload = async () => {
    if (!file || !sessionName || !user) {
      setError("Please provide a session name and select a file.");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(false);
      console.log("Starting upload process");

      // Read the file content
      const fileContent = await file.text();
      console.log("File content read, parsing CSV");
      const parsedData = parseCSV(fileContent);
      setParsedData(parsedData);
      console.log("CSV parsed successfully", parsedData);

      // Save session to database
      console.log("Saving session to database");
      const { data: sessionData, error: sessionError } = await supabase
        .from("shooting_sessions")
        .insert([
          {
            user_id: user.id,
            session_name: sessionName,
            total_score: parsedData.total_score,
            inner_tens: parsedData.inner_tens,
            series_totals: parsedData.series_totals,
            mpi_x: parsedData.mpi_x,
            mpi_y: parsedData.mpi_y,
            group_size: parsedData.group_size,
            session_date: new Date(), // Add session date
          },
        ])
        .select();

      if (sessionError) {
        console.error("Session insert error:", sessionError);
        throw sessionError;
      }

      console.log("Session saved successfully", sessionData);

      // Save series data
      if (sessionData && sessionData.length > 0) {
        const sessionId = sessionData[0].id;
        console.log("Saving series data for session ID:", sessionId);

        const seriesInserts = parsedData.series.map((series: any) => ({
          session_id: sessionId,
          series_number: series.series_number,
          series_total: series.series_total,
          shots: series.shots,
          mpi_x: series.mpi_x,
          mpi_y: series.mpi_y,
          group_size: series.group_size,
        }));

        console.log("Series data prepared:", seriesInserts);

        const { error: seriesError } = await supabase
          .from("session_series")
          .insert(seriesInserts);

        if (seriesError) {
          console.error("Series insert error:", seriesError);
          throw seriesError;
        }

        console.log("Series data saved successfully");
      }

      setSuccess(true);
      setSessionName("");
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById("csv-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      console.log("Upload process completed successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(error.message || "Failed to upload session data.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Upload Shooting Session</CardTitle>
        <CardDescription>
          Upload your shooting session data from a CSV file to calculate your
          ranking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="session-name"
              className="text-sm font-medium block mb-1"
            >
              Session Name
            </label>
            <Input
              id="session-name"
              placeholder="e.g., Morning Session with 12mm"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="csv-file"
              className="text-sm font-medium block mb-1"
            >
              CSV File
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="flex-1"
              />
              <Button
                onClick={handleUpload}
                disabled={!file || !sessionName || uploading}
                className="whitespace-nowrap"
              >
                {uploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>

          {file && (
            <div className="flex items-center text-sm text-blue-600">
              <FileText className="mr-2 h-4 w-4" />
              <span>{file.name}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="mr-2 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Session uploaded successfully!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShootingSessionUpload;
