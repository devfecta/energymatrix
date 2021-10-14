<?php
/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
    class Formulas {

        function __construct() {}

        /**
         * Last Average: Average = averageif(range from [a] to [b], >c, range from [a] to [b])
         * Previous [a] to [b] range based on inputs under “Show in Dashboard”
         * c = minimum operational value (L)
        */
        public function lastAverageOLD($rangeLow, $rangeHigh, $constraint) {
            // Array of all the numbers within the range.
            $range = range($rangeLow, $rangeHigh);
            // Number of numbers within the range.
            $count = count($range);
            // Adds up the numbers in the range.
            $sum = array_sum($range);
            // Calculates the range average.
            $average = $sum / $count;

            if ($average > $constraint) {
                $lastAverage = $average;
            }
            else {
                $lastAverage = $constraint;
            }
            return $lastAverage;
        }

        public function lastAverageNEW($sensorData, $startTime, $range) {

            return false;

            // Get sensor data
        }

        /**
         * Current Average: Average (d) = averageif(range from [a] to [b], >c, range from [a] to [b])
         * Current [a] to [b] range based on inputs under “Show in Dashboard”
         * c = minimum operational value (L)
        */
        /**
         * Takes an array of data points and creates an average of all data points that are greater than the constraint.
         *
         * @param   array   $dataPoints Array of sensor data points.
         * @param   float   $constraint Minimum operational value.
         *
         * @return  float
         */
        public function currentAverage($dataPoints, $constraint) {

            $data = array();
            // Creates an array data points that are greater than the constraint.
            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " NEW SET" . "\n", 3, "/var/www/html/app/php-errors.log");
            foreach ($dataPoints as $dataPoint) {

                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $dataPoint->getDataValue() . " = " . $dataPoint->getDate() . "\n", 3, "/var/www/html/app/php-errors.log");
                

                if ($dataPoint->getDataValue() > $constraint) {
                    array_push($data, $dataPoint->getDataValue());
                }
            }

            

            // Number of numbers within the range.
            $count = count($data);
            // Adds up the numbers in the range.
            $sum = array_sum($data);

            // Calculates the range average.
            $currentAverage = ($count > 0) ? $sum / $count : 0;

            return round($currentAverage, 3);
        }

        /**
         * General Formulas
         */
        public function addition($value1, $value2) {
            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode(array("value1" => $value1, "value2" => $value2), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            return $value1 + $value2;
        }

        public function subtraction($value1, $value2) {
            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode(array("value1" => $value1, "value2" => $value2), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            // Flipped values because value2 is the sensor data.
            return $value1 - $value2;
        }

        public function multiplication($value1, $value2) {
            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode(array("value1" => $value1, "value2" => $value2), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            return $value1 * $value2;
        }

        public function division($value1, $value2) {
            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode(array("value1" => $value1, "value2" => $value2), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            // Flipped values because value2 is the sensor data.
            return $value1 / $value2;
        }

        public function exponentiation($value1, $value2) {
            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode(array("value1" => $value1, "value2" => $value2), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            return $value1 ^ $value2;
        }
        /**
         * 4-20 mA Conversion: Process Value (input units) = (a – b) ÷ (c – b) x (d – e)
         * a = Sensor Reading (mA) (trend value)
         * b = mA min (input value)
         * c = mA max (input value)
         * d = Process Max (input value)
         * e = Process Min (input value)
        */
        public function maConversion($sensorReading, $maMin, $maMax, $processMin, $processMax) {
            $processValue = ($sensorReading - $maMin) / ($maMax - $maMin) * ($processMax - $processMin);
            return $processValue;
        }
        
        /**
         * Mass Flow: Mass Flow (LB/Hr) = a x b x 60 Min/Hr
         * a = Volumetric Flow (GPM) (trend value)
         * b = Density (LB/Gal) (input value)
        */
        public function massFlow($volumetricFlow, $density) {
            $lbPerHour = $volumetricFlow * $density * 60;
            return $lbPerHour;
        }
        
        /**
         * Current: Current (Amps) = a x b
         * a = Amp Hours (Ah) (trend value)
         * b = Averaging factor (input value)
        */
        public function current($ampHours, $averagingFactor) {
            $amps = $ampHours * $averagingFactor;
            return $amps;
        }
        
        /**
         * Power: Power (kW) = a x b x √3 x c ÷ 1,000
         * a = Current (Amps) (trend value)
         * b = Voltage (VAC) (input value)
         * c = Power Factor (%) (input value)
        */
        public function power($current, $voltage, $phaseNumber, $powerFactor) {
            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode(array("current" => $current, "voltage" => $voltage, "phaseNumber" => $phaseNumber, "powerFactor" => $powerFactor), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            $kw = $current * $voltage * sqrt($phaseNumber) * $powerFactor / 1000;
            return $kw;
        }
        
        /**
         * Chiller Efficiency: Efficiency (kW/TR) = [a x b x (c – d) /12,000 BTU/TR] ÷ e
         * a = Mass Flow (LB/Hr) (trend value)
         * b = Heat Capacity (BTU/LB-°F) (input value)
         * c = Chilled Media Return Temperature (°F) (trend value)
         * d = Chilled Media Supply Temperature (°F) (trend value)
         * e = Power (kW) (trend value)
         */
        public function chillerEfficiency($massFlow, $heatCapacity, $chilledMediaReturn, $chilledMediaSupply, $power) {
            $kwPerTr = ($massFlow * $heatCapacity * ($chilledMediaReturn - $chilledMediaSupply) / 12000) / $power;
            return $kwPerTr;
        }

    }
?>