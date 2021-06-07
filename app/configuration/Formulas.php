<?php

    require_once('Trend.php');

    class Formulas extends Trend {

        function __construct() {}

        /**
         * Last Average: Average = averageif(range from [a] to [b], >c, range from [a] to [b])
         * Previous [a] to [b] range based on inputs under “Show in Dashboard”
         * c = minimum operational value (L)
        */
        public function lastAverage() {
            return $average;
        }

        /**
         * Current Average: Average (d) = averageif(range from [a] to [b], >c, range from [a] to [b])
         * Current [a] to [b] range based on inputs under “Show in Dashboard”
         * c = minimum operational value (L)
        */
        public function currentAverage() {
            return $average;
        }
        
        /**
         * 4-20 mA Conversion: Process Value (input units) = (a – b) ÷ (c – b) x (d – e)
         * a = Sensor Reading (mA) (trend value)
         * b = mA min (input value)
         * c = mA max (input value)
         * d = Process Max (input value)
         * e = Process Min (input value)
        */
        public function maConversion() {
            return $processValue;
        }
        
        /**
         * Mass Flow: Mass Flow (LB/Hr) = a x b x 60 Min/Hr
         * a = Volumetric Flow (GPM) (trend value)
         * b = Density (LB/Gal) (input value)
        */
        public function massFlow() {
            return $lbPerHour;
        }
        
        /**
         * Current: Current (Amps) = a x b
         * a = Amp Hours (Ah) (trend value)
         * b = Averaging factor (input value)
        */
        public function current() {
            return $amps;
        }
        
        /**
         * Power: Power (kW) = a x b x √3 x c ÷ 1,000
         * a = Current (Amps) (trend value)
         * b = Voltage (VAC) (input value)
         * c = Power Factor (%) (input value)
        */
        public function power() {
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
        public function chillerEfficiency() {
            return $kwPerTr;
        }

    }
?>