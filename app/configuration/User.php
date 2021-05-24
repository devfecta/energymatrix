<?php

    class User {

        private $id;
        private $company;
        private $username;
        private $password;
        private $type;

        public function __construct() {}

        public static function getUser($userId) {

            $user = new static();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM users WHERE id=:id");
                $statement->bindParam(":id", $userId);
                $statement->execute();

                $results = $statement->fetch(PDO::FETCH_ASSOC);

                $user->setId($results['id']);
                $user->setCompany($results['company']);
                $user->setUsername($results['username']);
                $user->setPassword($results['password']);
                $user->setType($results['type']);

            }
            catch (PDOException $pdo) {
                error_log(date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log(date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                Configuration::closeConnection();
            }

            return $user;

        }

        public function getId() {
            return $this->id;
        }
        public function setId($id) {
            $this->id = $id;
        }

        public function getCompany() {
            return $this->company;
        }
        public function setCompany($company) {
            $this->company = $company;
        }

        public function getUsername() {
            return $this->username;
        }
        public function setUsername($username) {
            $this->username = $username;
        }

        public function getPassword() {
            return $this->password;
        }
        public function setPassword($password) {
            $this->password = $password;
        }

        public function getType() {
            return $this->type;
        }
        public function setType($type) {
            $this->type = $type;
        }

        public function register($formData) {
            $data = json_decode(json_encode($formData), false);
    
            $userInfo = ["authenticated" => false];
    
            /**
             * Returns the JSON with only user ID and authentication boolean
             */
            try {
    
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("INSERT INTO users (`company`, `username`, `password`) VALUES (:company, :username, :password)");
                $statement->bindParam(":company", $data->company);
                $statement->bindParam(":username", $data->username);
                $statement->bindParam(":password", password_hash($data->password, PASSWORD_BCRYPT));
                $statement->execute();
    
                if ($newUserId = $connection->lastInsertId() > 0) {
                    $userInfo['authenticated'] = true;
                }

                Configuration::closeConnection();
    
                return json_encode($userInfo, JSON_PRETTY_PRINT);
    
            }
            catch (PDOException $pdo) {
                return json_encode(array('error'=> $pdo->getMessage()), JSON_PRETTY_PRINT);
            }
            catch (Exception $e) {
                return json_encode(array('error'=> $e->getMessage()), JSON_PRETTY_PRINT);
            }
    
            return json_encode($userInfo, JSON_PRETTY_PRINT);
        }

        
        public function login($formData) {
            $data = json_decode(json_encode($formData), false);
    
            $userInfo = ["id" => 0, "authenticated" => false];
    
            /**
             * Returns the JSON with only user ID and authentication boolean
             */
            try {
    
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `users` WHERE `username`=:username1");

                $statement->bindParam(":username1", $data->username, PDO::PARAM_STR);

                $statement->execute();
    
                if ($statement->rowCount() > 0) {
                    $result = $statement->fetch(PDO::FETCH_ASSOC);
    
                    $userInfo['id'] = $result['id'];
                    $userInfo['company'] = $result['company'];
                    $userInfo['type'] = $result['type'];

                    $userInfo['authenticated'] = password_verify($data->password, $result['password']);
    
                }
                
                return json_encode($userInfo, JSON_PRETTY_PRINT);
    
            }
            catch (PDOException $pdo) {
                return json_encode(array('error'=> $pdo->getMessage()), JSON_PRETTY_PRINT);
            }
            catch (Exception $e) {
                return json_encode(array('error'=> $e->getMessage()), JSON_PRETTY_PRINT);
            }
            finally {
                Configuration::closeConnection();
            }
    
            return json_encode($userInfo, JSON_PRETTY_PRINT);
        }

        
    }
 
 ?>