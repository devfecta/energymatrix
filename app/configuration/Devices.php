<?php

class Devices {

    function __construct() {}

    public function addDevice($formData) {

        try {
            $connection = Configuration::openConnection();

            $statement = $connection->prepare("INSERT INTO `devices` (`name`, `tag`) VALUES (:deviceName, :deviceTag)");
            $statement->bindParam(":deviceName", $formData['deviceName']);
            $statement->bindParam(":deviceTag", $formData['deviceTag']);
            $statement->execute();

            $deviceId = $connection->lastInsertId();

            $result = array('name' => $formData['deviceName'], 'deviceId' => $deviceId);
        }
        catch(PDOException $pdo) {
            $result = array('error'=> $pdo->getMessage());
        }
        finally {
            Configuration::closeConnection();
        }

        return json_encode($result, JSON_PRETTY_PRINT);

    }

}

?>