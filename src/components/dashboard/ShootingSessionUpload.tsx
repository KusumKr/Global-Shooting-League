import React, { useState } from "react";
import { useAuth } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

  // Dummy parseCSV function
  const parseCSV = (csvText: string) => {
    return { dummy: true };
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
      // Simulate file reading and parsing
      const fileContent = await file.text();
      const parsedData = parseCSV(fileContent);
      setParsedData(parsedData);
      setSuccess(true);
      setSessionName("");
      setFile(null);
      const fileInput = document.getElementById("csv-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error: any) {
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
          ranking (local only, no DB)
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
              <span>Session uploaded locally!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShootingSessionUpload;
