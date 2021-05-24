<?php
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
                error_log(date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log(date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                Configuration::closeConnection();
            }

            return $companies;
        }
    }

?>