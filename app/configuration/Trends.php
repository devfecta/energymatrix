<?php
    // Needed to make the connection to the database.
    require_once('Configuration.php');
    // Contains sensor getters and setters.
    require_once('Sensor.php');

    class Trends extends Sensor {

        // The code in __construct is called when a Trends object is instantiated.
        function __construct() {}

        /* 
            // Used to establish a database connection.
            $connection = Configuration::openConnection();

            // Create a SQL statement.
            $statement = $connection->prepare("SELECT `id`, `user_id` FROM `sensors` WHERE `user_id`=:user_id AND `sensorName`=:sensorName");

            // Binds values to the SQL statement. There can be more than one bindValue if needed.
            $statement->bindValue(":user_id", $userId, PDO::PARAM_INT);
            $statement->bindValue(":sensorName", $sensorName, PDO::PARAM_STR);

            // Executes the SQL statement.
            $statement->execute();

            // fetchAll gets all of the returned records and puts them into an associative array.
            // rowCount just get the number of returned records.
            // In this example I'm checking to see if there is more than 0 records returned, 
            // and if so assign the associative array to the variable, if not just assign an empty array.
            $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();
        */

        // Function example
        public function exampleFunction ($value1, $value2) {
            $value = $value1 + $value2;
            return $value;
        }
    }
?>