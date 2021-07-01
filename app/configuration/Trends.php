<?php
    // Needed to make the connection to the database.
    require_once('Configuration.php');
    // Contains sensor getters and setters.
    require_once('Trend.php');
    require_once('Formulas.php');

    class Trends extends Trend {

        public $formulas;
        public $trend;

        function __construct() {
            // Brings the formulas into this class.
            $this->formulas = new Formulas();
        }

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

        /**
         * Gets the information for a specific trend.
         *
         * @param   int $trendId  The ID of a trend.
         *
         * @return  array   An array of trend information.
         */
        public function getTrend($trendId) {

            $trend = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trends` WHERE `id`=:trendId");

                $statement->bindValue(":trendId", $trendId, PDO::PARAM_INT);

                $statement->execute();

                $trend = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $trend;
        }

        public function getTrends($userId, $sensorId) {

            $trends = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trends` WHERE `userId`=:userId AND  `sensorId`=:sensorId ORDER BY `operationalStartTIME` DESC");
                $statement->bindValue(":userId", $userId, PDO::PARAM_INT);
                $statement->bindValue(":sensorId", $sensorId, PDO::PARAM_INT);

                $statement->execute();

                $trends = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $trends;


        }
        /**
         * Inserts a new trend into the database and returns an array of the new trend information.
         *
         * @param   json  $formData  JSON string
         *
         * @return  array            An array of new trend information.
         */
        public function insertTrend($formData) {

            $result = array();

            $data = json_decode(json_encode($formData), false);

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("INSERT INTO `trends` (
                    `userId`,
                    `sensorId`,
                    `lowestLevel`,
                    `highestLevel`,
                    `operationalMinimum`,
                    `operationalMaximum`,
                    `operationalStartTime`,
                    `operationalDuration`
                ) 
                VALUES (
                    :userId,
                    :sensorId,
                    :lowestLevel,
                    :highestLevel,
                    :operationalMinimum,
                    :operationalMaximum,
                    :operationalStartTime,
                    :operationalDuration
                )");
                $statement->bindParam(":userId", $data->userId, PDO::PARAM_INT);
                $statement->bindValue(":sensorId", $data->sensorId, PDO::PARAM_INT);
                $statement->bindParam(":lowestLevel", $data->lowestLevel, PDO::PARAM_INT);
                $statement->bindParam(":highestLevel", $data->highestLevel, PDO::PARAM_INT);
                $statement->bindParam(":operationalMinimum", $data->operationalMinimum, PDO::PARAM_INT);
                $statement->bindValue(":operationalMaximum", $data->operationalMaximum, PDO::PARAM_INT);
                $statement->bindParam(":operationalStartTime", $data->operationalStartTime, PDO::PARAM_STR);
                $statement->bindParam(":operationalDuration", $data->operationalDuration, PDO::PARAM_INT);

                $connection->beginTransaction();
                $statement->execute();
                $lastInsertId = $connection->lastInsertId();
                $connection->commit();


                $statement = $connection->prepare("SELECT * FROM `trends` WHERE `id`=:trendId");
                $statement->bindValue(":trendId", $lastInsertId, PDO::PARAM_INT);
                $statement->execute();

                $result = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();
                
            }
            catch(PDOException $pdo) {
                $connection->rollback();
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }

            return $result;
        }

        public function insertCalculatedTrend($formData) {
            $result = array();

            $data = json_decode(json_encode($formData), false);

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("INSERT INTO `trendsCalculated` (
                    `userId`,
                    `sensorId`,
                    `trendName`,
                    `trendFormula`,
                    `inputs`,
                    `associatedTrends`
                ) 
                VALUES (
                    :userId,
                    :sensorId,
                    :trendName,
                    :trendFormula,
                    :inputs,
                    :associatedTrends
                )");
                
                $statement->bindParam(":userId", $data->userId, PDO::PARAM_INT);
                $statement->bindValue(":sensorId", $data->sensorId, PDO::PARAM_INT);
                $statement->bindParam(":trendName", $data->trendName, PDO::PARAM_STR);
                $statement->bindParam(":trendFormula", $data->trendFormula, PDO::PARAM_STR);
                $statement->bindParam(":inputs", $data->inputs, PDO::PARAM_STR);
                $statement->bindValue(":associatedTrends", $data->associatedTrends, PDO::PARAM_STR);

                $connection->beginTransaction();
                $statement->execute();
                $lastInsertId = $connection->lastInsertId();
                $connection->commit();


                $statement = $connection->prepare("SELECT * FROM `trendsCalculated` WHERE `id`=:trendId");
                $statement->bindValue(":trendId", $lastInsertId, PDO::PARAM_INT);
                $statement->execute();

                $result = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();
                
            }
            catch(PDOException $pdo) {
                $connection->rollback();
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }

            return $result;
        }

        public function getFormulas() {

            $formulas = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `formulas` ORDER BY `displayName` ASC");

                $statement->execute();

                $formulas = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $formulas;
        }

        public function getFormulaTrends($userId, $sensorId) {

            $trends = array();
            
            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trendsCalculated` WHERE `userId`=:userId AND `sensorId`=:sensorId ORDER BY `trendName` ASC");
                $statement->bindParam(":userId", $userId, PDO::PARAM_INT);
                $statement->bindValue(":sensorId", $sensorId, PDO::PARAM_INT);
                $statement->execute();

                $trends = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $trends;
        }
    }
?>