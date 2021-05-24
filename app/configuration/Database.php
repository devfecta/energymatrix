<?php

require_once('Configuration.php');

class Database {

    function __construct() {}

    public function importCSV($formData) {

        try {
            $connection = Configuration::openConnection();

            $csvFileName = $_FILES["csvFile"]["tmp_name"];

            $recordCount = 0;

            if($_FILES["csvFile"]["size"] > 0) {

                $file = fopen($csvFileName, "r");

                $statement = $connection->prepare(
                    "INSERT INTO `data` (`report_id`, `data_point`, `date_time`, `time_lapse`, `flow_rate`, `total_volume`, `steam`, `feedwater`, `error`) 
                    VALUES (:report_id, :data_point, :date_time, :time_lapse, :flow_rate, :total_volume, :steam, :feedwater, :error)");

                while (($data = fgetcsv($file, 10000, ",")) !== FALSE) {

                    $statement->bindParam(":report_id", $data[0], PDO::PARAM_INT);
                    $statement->bindParam(":data_point", $data[1], PDO::PARAM_STR);
                    $statement->bindParam(":date_time", $data[2], PDO::PARAM_STR);
                    $statement->bindParam(":time_lapse", $data[3], PDO::PARAM_STR);
                    $statement->bindParam(":flow_rate", $data[4], PDO::PARAM_STR);
                    $statement->bindParam(":total_volume", $data[5], PDO::PARAM_STR);
                    $statement->bindParam(":steam", $data[6], PDO::PARAM_STR);
                    $statement->bindParam(":feedwater", $data[7], PDO::PARAM_INT);
                    $statement->bindParam(":error", $data[8], PDO::PARAM_INT);
                    //$statement->execute();

                    if ($statement->execute()) {

                        $recordCount += $statement->rowCount();
                        
                    }

                }

                fclose($file);

            }
            else {

                return json_encode(array('error'=> "Empty File Found"), JSON_PRETTY_PRINT);

            }

            Configuration::closeConnection();

            return json_encode(array('count' => $recordCount), JSON_PRETTY_PRINT);

        }
        catch (PDOException $pdo) {
            //return "PDO Error: " . $pdo->getMessage();
            return json_encode(array('error'=> $pdo->getMessage()), JSON_PRETTY_PRINT);
        }
        
    }

}

?>