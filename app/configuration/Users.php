<?php
/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
    require_once('Configuration.php');
    require_once('User.php');

    class Users extends User {

        function __construct() {}

        public function getCompanies() {

            $companies = array();

            try {

                $connection = Configuration::openConnection();
    
                $statement = $connection->prepare("SELECT `users`.`id`, `users`.`company` FROM `users` 
                WHERE `users`.`type`=0 
                ORDER BY `users`.`company`");
                $statement->execute();

                $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                foreach ($results as $company) {
                    array_push($companies, User::getUser($company['id']));
                }

            }
            catch(PDOException $pdo) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                Configuration::closeConnection();
            }

            return $companies;
        }

        public function deleteCompany($userInfo) {
            $result = false;
            $data = json_decode(json_encode($userInfo), false);
            //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $sensorId . "\n", 3, ERROR_LOG);

            try {
                $connection = Configuration::openConnection();
                // Deletes User, Sensors, and Trends
                $statement = $connection->prepare("DELETE FROM `users` WHERE `id`=:id");
                $statement->bindParam(":id", $data->userId, PDO::PARAM_INT);
                $result = $statement->execute() ? true : false;

                if ($result) {
                    // Deletes user Data Points.
                    $statement = $connection->prepare("DELETE FROM `dataPoints` WHERE `user_id`=:userId");
                    $statement->bindParam(":userId", $data->userId, PDO::PARAM_INT);
                    $statement->execute();

                }
            }
            catch(PDOException $pdo) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                Configuration::closeConnection();
            }
            
            return $result;
        }

    }

?>