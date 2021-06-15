<?php

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

        public function lastAverage($sensorData, $startTime, $range) {

            return false;

            // Get sensor data
        }

        /**
         * Current Average: Average (d) = averageif(range from [a] to [b], >c, range from [a] to [b])
         * Current [a] to [b] range based on inputs under “Show in Dashboard”
         * c = minimum operational value (L)
        */
        public function currentAverage($rangeStart, $rangeEnd, $constraint) {
            return $currentAverage;
        }
        
        /**
         * 4-20 mA Conversion: Process Value (input units) = (a – b) ÷ (c – b) x (d – e)
         * a = Sensor Reading (mA) (trend value)
         * b = mA min (input value)
         * c = mA max (input value)
         * d = Process Max (input value)
         * e = Process Min (input value)
        */
        public function maConversion($sensorReading, $maMin, $maMax, $procesMin, $processMax) {
            $processValue = ($sensorReading - $maMin) / ($maMax - $maMin) * ($processMax - $procesMin);
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
            $amps = $ampHours + $averagingFactor;
            return $amps;
        }
        
        /**
         * Power: Power (kW) = a x b x √3 x c ÷ 1,000
         * a = Current (Amps) (trend value)
         * b = Voltage (VAC) (input value)
         * c = Power Factor (%) (input value)
        */
        public function power($current, $voltage, $powerFactor) {
            $kw = $current * $voltage * sqrt(3) * $powerFactor / 1000;
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