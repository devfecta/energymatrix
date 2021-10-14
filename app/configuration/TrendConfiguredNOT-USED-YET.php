<?php
/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
    class TrendConfigured {

        public $userId = 0;
        public $sensorID = 0;
        public $trendName = "";
        public $trendFormula = "";
        public $inputs = array();
        public $associatedSensors = array();
        public $associatedTrends = array();
        public $trendDataPoints = array();

        function __construct() {}

        /**
         * Gets the ID of the user associated with this trend.
         *
         * @return  int
         */
        public function getUserId()
        {
            return $this->userId;
        }
        /**
         * Set the value of userId
         *
         * @param   int  $userId
         */
        public function setUserId(int $userId)
        {
            $this->userId = $userId;
        }

        /**
         * Gets the ID of the sensor associated with this trend.
         *
         * @return  int
         */
        public function getSensorID()
        {
            return $this->sensorID;
        }
        /**
         * Set the value of sensorID
         *
         * @param   int  $sensorID
         */
        public function setSensorID(int $sensorID)
        {
            $this->sensorID = $sensorID;
        }

        /**
         * Get the name of this trend.
         *
         * @return  string
         */
        public function getTrendName()
        {
            return $this->trendName;
        }
        /**
         * Set the value of trendName
         *
         * @param   string  $trendName
         */
        public function setTrendName(string $trendName)
        {
            $this->trendName = $trendName;
        }

        /**
         * Gets the name of formula that should be used to calculate the data points for this trend.
         *
         * @return  string
         */
        public function getTrendFormula()
        {
            return $this->trendFormula;
        }
        /**
         * Set the value of trendFormula
         *
         * @param   string  $trendFormula
         */
        public function setTrendFormula(string $trendFormula)
        {
            $this->trendFormula = $trendFormula;
        }

        /**
         * Gets an array of inputs associated with this trend.
         *
         * @return  array
         */
        public function getInputs()
        {
            return $this->inputs;
        }
        /**
         * Set the value of inputs
         *
         * @param   array  $inputs
         */
        public function setInputs(array $inputs)
        {
            $this->inputs = $inputs;
        }

        /**
         * Gets an array of sensor objects that are associated with this trend.
         *
         * @return  array
         */
        public function getAssociatedSensors()
        {
            return $this->associatedSensors;
        }
        /**
         * Set the value of associatedSensors
         *
         * @param   array  $associatedSensors
         */
        public function setAssociatedSensors(array $associatedSensors)
        {
            $this->associatedSensors = $associatedSensors;
        }

        /**
         * Gets an array of trend objects that are associated with this trend.
         *
         * @return  array
         */
        public function getAssociatedTrends()
        {
            return $this->associatedTrends;
        }
        /**
         * Set the value of associatedTrends
         *
         * @param   array  $associatedTrends
         */
        public function setAssociatedTrends(array $associatedTrends)
        {
            $this->associatedTrends = $associatedTrends;
        }
    }
?>