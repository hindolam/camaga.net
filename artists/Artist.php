<?php

class Artist
{

    var $artist;

    function __construct($concert, $index)
    {
        $artists      = $concert->getArtists();
        $this->artist = $artists[$index];
    }


    function getName()
    {

        return $this->artist["name"];
    }
    function getInstrument()
    {

        return $this->artist["instrument"];

    }
    function getLink()
    {

        $search_array = array(
            'first' => 1,
            'second' => 4
        );

        if (empty($this->artist["link"])) {

            $link = "https://www.google.com/search?q=" . $this->getName();


        } else {
            $link = $this->artist["link"];
        }

        return $link;
    }

}

?>