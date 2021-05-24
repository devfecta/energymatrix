<?php
require("config.php");

class Configuration extends PDO {

    private static $connection = null;
    
    function __construct() {

        try {
            // Establish MySQL connection using the PDO class.
            parent::__construct(DNS, USERNAME, PASSWORD);
            //echo "Could Connect to Database";
        }
        catch (PDOException $e) {
            //echo "Could NOT Connect to Database";
            echo json_encode(array("error" => $e));
        }

    }
    /**
     * Creates a connection to the MySQL database.
     */
    public static function openConnection() {
        // Create a new instance of the Database class if connMySQL isn't set.
        if (!(self::$connection instanceof Database)) {
            self::$connection = new Configuration();
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$connection;
    }
    /**
     * Closes the connection to the MySQL database.
     */
    public static function closeConnection() {
        self::$connection = null;
        return true;
    }

}

?>