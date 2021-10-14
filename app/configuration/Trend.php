<?php
/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
/**
 * A Trend is created by kinergetics or kinergetics' customer.
 */
    class Trend {

        /**
         * The lowest possible level for a device/equipment.
         * 
         * @var int $lowestLevel
         */
        public $lowestLevel = 0;
        /**
         * The highest possible level for a device/equipment.
         * 
         * @var int $highestLevel
         */
        public $highestLevel = 0;
        /**
         * Lowest desired operational level.
         * 
         * @var int $operationalMinimum
         */
        public $operationalMinimum = 0;
        /**
         * Highest desired operational level.
         * 
         * @var int $operationalMaximum
         */
        public $operationalMaximum = 0;
        /**
         * The start time for the trend.
         * 
         * @var int $operationalStartTime
         */
        public $operationalStartTime = 0;
        /**
         * The duration of the trend (i.e. an 8-hour duration could be 8am to 4pm).
         * 
         * @var int $operationalDuration
         */
        public $operationalDuration = 0;
        
        function __construct() {}
        /**
         * Get $lowestLevel
         *
         * @return  int
         */ 
        public function getLowestLevel()
        {
                return $this->lowestLevel;
        }
        /**
         * Set $lowestLevel
         *
         * @param  int  $lowestLevel
         */ 
        public function setLowestLevel(int $lowestLevel)
        {
                $this->lowestLevel = $lowestLevel;
        }

        /**
         * Get $highestLevel
         *
         * @return  int
         */ 
        public function getHighestLevel()
        {
                return $this->highestLevel;
        }
        /**
         * Set $highestLevel
         *
         * @param  int  $highestLevel
         */ 
        public function setHighestLevel(int $highestLevel)
        {
                $this->highestLevel = $highestLevel;
        }

        /**
         * Get $operationalMinimum
         *
         * @return  int
         */ 
        public function getOperationalMinimum()
        {
                return $this->operationalMinimum;
        }
        /**
         * Set $operationalMinimum
         *
         * @param  int  $operationalMinimum
         */ 
        public function setOperationalMinimum(int $operationalMinimum)
        {
                $this->operationalMinimum = $operationalMinimum;
        }

        /**
         * Get $operationalMaximum
         *
         * @return  int
         */ 
        public function getOperationalMaximum()
        {
                return $this->operationalMaximum;
        }
        /**
         * Set $operationalMaximum
         *
         * @param  int  $operationalMaximum
         */ 
        public function setOperationalMaximum(int $operationalMaximum)
        {
                $this->operationalMaximum = $operationalMaximum;
        }

        /**
         * Get $operationalStartTime
         *
         * @return  string
         */ 
        public function getOperationalStartTime()
        {
                return $this->operationalStartTime;
        }
        /**
         * Set $operationalStartTime
         *
         * @param  string  $operationalStartTime
         */ 
        public function setOperationalStartTime(string $operationalStartTime)
        {
                $this->operationalStartTime = $operationalStartTime;
        }

        /**
         * Get $operationalDuration
         *
         * @return  int
         */ 
        public function getOperationalDuration()
        {
                return $this->operationalDuration;
        }
        /**
         * Set $operationalDuration
         *
         * @param  int  $operationalDuration
         */ 
        public function setOperationalDuration(int $operationalDuration)
        {
                $this->operationalDuration = $operationalDuration;
        }

    }
?>