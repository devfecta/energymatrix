<?php
require_once('Configuration.php');

    class Device {

        private $id;
        private $name;
        private $tag;

        public function __construct($deviceId) {

            if ($deviceId != null) {

                try {

                    $connection = Configuration::openConnection();

                    $statement = $connection->prepare("SELECT * FROM devices WHERE id=:id");
                    $statement->bindParam(":id", $deviceId);
                    $statement->execute();

                    $results = $statement->fetch(PDO::FETCH_ASSOC);

                    $this->setId($results['id']);
                    $this->setName($results['name']);
                    $this->setTag($results['tag']);

                    Configuration::closeConnection();
                }
                catch (PDOException $e) {
                    return "Error: " . $e->getMessage();
                }

            }

        }

        public function getId() {
            return $this->id;
        }
        public function setId($id) {
            $this->id = $id;
        }

        public function getName() {
            return $this->name;
        }
        public function setName($name) {
            $this->name = $name;
        }

        public function getTag() {
            return $this->tag;
        }
        public function setTag($tag) {
            $this->tag = $tag;
        }

    }

?>