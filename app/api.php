<?php
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
/**
 * May be able to remove this in production
 */
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
ob_start();
session_start();

require('configuration/Configuration.php');

require('configuration/Device.php');
require("configuration/Devices.php");

require('configuration/User.php');
require("configuration/Users.php");

require("configuration/Sensor.php");
require("configuration/Sensors.php");

require("configuration/Trends.php");

//require("configuration/DataPoint.php");
require("configuration/DataPoints.php");

//$requestMethod = $_SERVER['REQUEST_METHOD'];
$registration = null;
$encodedJSON = null;

//echo json_encode(array("type" => "API Call", "request-method" => $_SERVER['REQUEST_METHOD'], "post" => $_POST, "get" => $_GET));
////$test = json_encode($_POST, false);
////echo json_encode(array("type" => $_POST["sensor"]));
//echo json_encode($_GET, false);
//echo json_encode($_POST, false);
//exit();

header('Content-Type: application/json; charset=utf-8');

switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":
    //echo "REQUEST_METHOD Post";
        
        //$post = json_decode($_POST, false);
        // Creates
        if (isset($_GET['class']) && !empty($_GET['class'])) {
            switch ($_GET['class']) {
                case "User":
                    $User = new User();
                    switch ($_GET['method']) {
                        case "register":
                            // Return JSON of the registrants
                            $result = json_decode($User->register($_POST), false);
                            $_SESSION['company'] = $_POST['company'];
                            $_SESSION['username'] = $_POST['username'];
                            if (!$result->authenticated) {
                                $_SESSION['message'] = "Could Not Register the Account";
                                header("Location: register.php");
                            }
                            else {
                                header("Location: index.php");
                            }
                            
                            break;
                        case "login":
                            $result = json_decode($User->login($_POST), false);
                            if ($result->authenticated) {
                                $_SESSION['userId'] = $result->id;
                                $_SESSION['company'] = $result->company;
                                $_SESSION['type'] = $result->type;

                                if ($result->type > 0) {
                                    setcookie("adminId", $result->id, time()+3600);
                                }
                                else {
                                    setcookie("userId", $result->id, time()+3600);
                                }

                                setcookie("userType", $result->type, time()+3600);

                                header("Location: index.php");

                            }
                            else {
                                header("Location: login.php");
                            }
                            break;
                        default:
                            echo json_encode(array("error" => 'GET METHOD ERROR: The '.$_GET['method'].' method does not exist.\n'), JSON_PRETTY_PRINT);
                            break;
                    }
                    break;
                case "Sensors":
                    // Might be able to delete
                    /*
                    $Sensors = new Sensors();
                    switch ($_GET['method']) {
                        case "addSensor":
                            $result = json_decode($Sensors->addSensor($_POST), false);

                            if ($result) {
                                header("Location: index.php");
                            }
                            else {
                                header("Location: addSensor.php");
                            }
                            
                            break;
                        default:
                            echo json_encode(array("error" => 'GET METHOD ERROR: The '.$_GET['method'].' method does not exist.\n'), JSON_PRETTY_PRINT);
                            break;
                    }
                    break;
                    */
                default:
                    echo json_encode(array("error" => 'GET CLASS ERROR: The '.$_GET['class'].' class does not exist.\n'), JSON_PRETTY_PRINT);
                    break;
            }
        }
        // NEWER SECTION
        if (isset($_POST["class"])) {
            
            switch ($_POST['class']) {
                case "Users":
                    $Users = new Users();
                    switch ($_POST['method']) {
                        case "deleteCompany":
                            $result =  $Users->deleteCompany($_POST);
                            echo $result;
                            break;
                        default:
                            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'POST METHOD ERROR: The '.$_POST['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                case "DataPoints":
                    $DataPoints = new DataPoints();
                    switch ($_POST['method']) {
                        case "getDataPoints":
                            //echo json_encode(array("message" => $_GET['userId'].' = '.$_GET['dateTime']), JSON_PRETTY_PRINT);
                            echo $DataPoints->getDataPoints((int)$_POST['userId'], $_POST['startDateTime'], $_POST['endDateTime']);
                            break;
                        default:
                            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'GET METHOD ERROR: The '.$_POST['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                case "Sensors":
                    $Sensors = new Sensors();
                    switch ($_POST['method']) {
                        case "addSensor":
                            $result =  $Sensors->addSensor($_POST);
                            echo $result;
                            break;
                        case "updateSensor":
                            $result =  $Sensors->updateSensor($_POST);
                            echo $result;
                            break;
                        case "deleteSensor":
                            $result =  $Sensors->deleteSensor($_POST['sensorId'], $_POST['userId']);
                            echo $result;
                            break;
                        default:
                            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'POST METHOD ERROR: The '.$_POST['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                case "Trends":
                    $trends = new Trends();
                    switch ($_POST['method']) {
                        case "insertUserConfiguredTrend":
                            // error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($trends->getTrends((int)$_GET['userId'], (int)$_GET['sensorId'])) . "\n", 3, "/var/www/html/app/php-errors.log");
                            echo json_encode($trends->insertUserConfiguredTrend($_POST));
                            break;
                        case "setDashboardVisibility":
                            echo $trends->setDashboardVisibility($_POST);
                            break;
                        case "insertConfiguredTrend":
                            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($_POST, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                            echo json_encode($trends->insertConfiguredTrend($_POST));
                            break;
                        case "deleteConfiguredTrend":
                            $result =  $trends->deleteConfiguredTrend($_POST['trendId']);
                            echo $result;
                            break;
                        case "setTrendVisibility":
                            echo $trends->setTrendVisibility($_POST);
                            break;
                        default:
                            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'POST METHOD ERROR: The '.$_POST['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                default:
                    error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'POST CLASS ERROR: The '.$_POST['class'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                    break;
            }
        }
        break;
    case "GET":
        // Reads
        if (isset($_GET['class'])) {
            switch ($_GET['class']) {
                case "Users":
                    $users = new Users();
                    switch ($_GET['method']) {
                        case "getCompanies":

                            $companies = $users->getCompanies();

                            $companiesArray = array();
                            
                            foreach($companies as $company) {
                                array_push($companiesArray, array("id" => $company->getId(), "company" => $company->getCompany(), "type" => $company->getType()));    
                            }

                            echo json_encode($companiesArray);

                            break;
                        default:
                            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'GET METHOD ERROR: The '.$_GET['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                case "Sensors":
                    $Sensors = new Sensors();
                    switch ($_GET['method']) {
                        case "getUserSensors":
                            //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $_GET['userId'] . "\n", 3, "/var/www/html/app/php-errors.log");
                            

                            $userSensors = $Sensors->getUserSensors($_GET['userId']);

                            $sensorArray = array();

                            foreach($userSensors as $sensor) {
                                
                                array_push($sensorArray, array("id" => $sensor->getId(), "sensorId" => $sensor->getSensorId(), "sensor_name" => $sensor->getSensorName(), "userId" => $sensor->getUserId()));    
                            }

                            echo json_encode($sensorArray);

                            break;
                        case "getSensors":
                            $sensors = $Sensors->getSensors();

                            $sensorsArray = array();

                            foreach($sensors as $sensor) {
                                array_push($sensorsArray, array("id" => $sensor->getId(), "sensorId" => $sensor->getSensorId(), "sensor_name" => $sensor->getSensorName(), "userId" => $sensor->getUserId()));    
                            }

                            echo json_encode($sensorsArray);
                            break;
                        default:
                            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'GET METHOD ERROR: The '.$_GET['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                case "Sensor":
                    $sensor = new Sensor();
                    switch ($_GET['method']) {
                        case "getSensor":

                            $sensor = Sensor::getSensor($_GET['sensorId']);

                            $sensorArray = array("id" => $sensor->getId(), "sensorId" => $sensor->getSensorId(), "sensor_name" => $sensor->getSensorName(), "user_id" => $sensor->getUserId());

                            echo json_encode($sensorArray);

                            break;
                        default:
                            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'GET METHOD ERROR: The '.$_GET['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                case "DataPoints":
                    $dataPoints = new DataPoints();
                    switch ($_GET['method']) {
                        case "getMinMaxDates":
                            echo $dataPoints->getMinMaxDates($_GET['userId'], $_GET['sensorId']);
                            break;
                        case "getSensorDataPoints":
                            $dataPointArray = array();

                            $dataPointsArray = $dataPoints->getSensorDataPoints($_GET['userId'], $_GET['sensorId'], $_GET['startDateTime'], $_GET['endDateTime']);

                            foreach($dataPointsArray as $dataPoint) {
                                
                                array_push($dataPointArray, 
                                    array(
                                        "id" => $dataPoint->getDataPointId()
                                        , "user_id" => $dataPoint->getUserId()
                                        , "sensor_id" => $dataPoint->getSensorId()
                                        , "date_time" => $dataPoint->getDate()
                                        , "data_type" => $dataPoint->getDataType()
                                        , "data_value" => $dataPoint->getDataValue()
                                        , "custom_value" => $dataPoint->getCustomValue()
                                    )
                                );
                                
                            }

                            echo json_encode($dataPointArray);
                            break;
                        case "getSensorDataTypes":
                            $dataTypessArray = $dataPoints->getSensorDataTypes($_GET['sensorId']);
                            echo json_encode($dataTypessArray);
                            break;
                        case "getDataPoints":
                            //echo json_encode(array("message" => $_GET['userId'].' = '.$_GET['dateTime']), JSON_PRETTY_PRINT);
                            echo $dataPoints->getDataPoints((int)$_GET['userId'], $_GET['startDateTime'], 'null');
                            break;
                        default:
                            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'GET METHOD ERROR: The '.$_GET['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                case "Trends":
                    $trends = new Trends();       
                    switch ($_GET['method']) {
                        case "getTrends":
                            // error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($trends->getTrends((int)$_GET['userId'], (int)$_GET['sensorId'])) . "\n", 3, "/var/www/html/app/php-errors.log");
                            echo json_encode($trends->getTrends($_GET['userId'], (int)$_GET['sensorId']), JSON_PRETTY_PRINT);
                            break;
                        case "getConfiguredTrends":
                            echo json_encode($trends->getConfiguredTrends($_GET), JSON_PRETTY_PRINT);
                            break;
                        case "getConfiguredTrend":
                            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($trends->getConfiguredTrend($_GET), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                            echo json_encode($trends->getConfiguredTrend($_GET), JSON_PRETTY_PRINT);
                            break;
                        case "getUserConfiguredTrends":
                            echo json_encode($trends->getUserConfiguredTrends($_GET), JSON_PRETTY_PRINT);
                            break;
                        case "getUserConfiguredTrendAverages":
                            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($_GET, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($trends->getUserConfiguredTrendAverages($_GET), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                            echo json_encode($trends->getUserConfiguredTrendAverages($_GET), JSON_PRETTY_PRINT);
                            break;
                        case "getFormulas":
                            echo json_encode($trends->getFormulas(), JSON_PRETTY_PRINT);
                            break;
                        case "getFormulaTrends":
                            echo json_encode($trends->getFormulaTrends((int)$_GET['userId'], (int)$_GET['sensorId']), JSON_PRETTY_PRINT);
                            break;
                        default:
                            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'GET METHOD ERROR: The '.$_GET['method'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    break;
                default:
                    error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . 'GET CLASS ERROR: The '.$_GET['class'].' method does not exist.' . "\n", 3, "/var/www/html/app/php-errors.log");
                    break;
            }
        } else {
           // echo json_encode(array("error" => 'GET ERROR: Form type not set.\n'), JSON_PRETTY_PRINT);
        }
        break;
    default:
        //echo "REQUEST_METHOD Default";
        error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " REQUEST_METHOD NOT FOUND " . "\n", 3, "/var/www/html/app/php-errors.log");
        break;
}

ob_flush();
?>
