var simplemaps_countrymap_mapdata = {
    main_settings: {
        //General settings
        width: "responsive", //'700' or 'responsive'
        background_color: "#FFFFFF",
        background_transparent: "yes",
        border_color: "#040D2D",

        //State defaults
        state_description: "State description",
        state_color: "#FFFFFF",
        state_hover_color: "#5678FF",
        state_url: "",
        border_size: "1",
        all_states_inactive: "no",
        all_states_zoomable: "no",

        //Location defaults
        location_description: "Location description",
        location_url: "",
        location_color: "#FF0067",
        location_opacity: 0.8,
        location_hover_opacity: 1,
        location_size: 25,
        location_type: "square",
        location_image_source: "frog.png",
        location_border_color: "#FFFFFF",
        location_border: 2,
        location_hover_border: 2.5,
        all_locations_inactive: "no",
        all_locations_hidden: "no",

        //Label defaults
        label_color: "#040D2D",
        label_hover_color: "#FFF",
        label_size: 22,
        label_font: "Mulish",
        hide_labels: "no",
        hide_eastern_labels: "no",

        //Zoom settings
        zoom: "no",
        manual_zoom: "no",
        back_image: "no",
        initial_back: "no",
        initial_zoom: "-1",
        initial_zoom_solo: "no",
        region_opacity: 1,
        region_hover_opacity: 0.6,
        zoom_out_incrementally: "yes",
        zoom_percentage: 0.99,
        zoom_time: 0.5,

        //Popup settings
        popup_color: "white",
        popup_opacity: 0.9,
        popup_shadow: 1,
        popup_corners: 5,
        popup_font: "12px/1.5 Mulish, sans-serif",
        popup_nocss: "no",

        //Advanced settings
        div: "map",
        auto_load: "yes",
        url_new_tab: "no",
        images_directory: "default",
        fade_time: 0.1,
        link_text: "View Website",
        popups: "detect",
        state_image_url: "",
        state_image_position: "",
        location_image_url: "",
        border_hover_color: "#5678FF"
    },
    state_specific: {
        UKR283: {
            description: "0",
            inactive: "yes"
        },
        UKR284: {
            name: "Миколаївська область",
            description: "4"
        },
        UKR285: {
            name: "Чернігівська область",
            description: "1"
        },
        UKR286: {
            name: "Рівненська область",
            description: "8"
        },
        UKR288: {
            name: "Чернівецька область",
            description: "2"
        },
        UKR289: {
            name: "Івано-Франківськ",
            description: "4"
        },
        UKR290: {
            description: "3",
            name: "Хмельницька область"
        },
        UKR291: {
            description: "6",
            name: "Львівська область"
        },
        UKR292: {
            name: "Тернопільська область",
            description: "6"
        },
        UKR293: {
            name: "Закарпатська область",
            description: "1"
        },
        UKR318: {
            name: "Волинська область",
            description: "16"
        },
        UKR319: {
            name: "Черкаська область",
            description: "5"
        },
        UKR320: {
            name: "Кіровоградська область",
            description: "3"
        },
        UKR321: {
            description: "1",
            name: "Київська область"
        },
        UKR322: {
            name: "Одеська область",
            description: "13"
        },
        UKR323: {
            name: "Вінницька область",
            description: "21"
        },
        UKR324: {
            name: "Житомирська область",
            description: "6"
        },
        UKR325: {
            name: "Сумська область",
            description: "1"
        },
        UKR326: {
            name: "Дніпропетровська область",
            description: "19"
        },
        UKR327: {
            name: "Донецька область",
            description: "3"
        },
        UKR328: {
            name: "Харківська область",
            description: "3"
        },
        UKR329: {
            description: "9",
            name: "Луганська область"
        },
        UKR330: {
            description: "16",
            name: "Полтавська область"
        },
        UKR331: {
            description: "3",
            name: "Запорізька область"
        },
        UKR4826: {
            name: "Київ",
            description: "1"
        },
        UKR4827: {
            name: "Херсонська область",
            description: "32"
        },
        UKR5482: {
            description: "0",
            inactive: "yes"
        }
    },
    locations: {},
    labels: {
        "0": {
            name: "",
            x: 148.41,
            y: 110.61,
            parent_id: "UKR318"
        },
        "1": {
            name: "",
            x: 239.13,
            y: 125.73,
            parent_id: "UKR286"
        },
        "2": {
            name: "",
            x: 348.75,
            y: 155.97,
            parent_id: "UKR324"
        },
        "3": {
            name: "",
            x: 445.77,
            y: 224.01,
            parent_id: "UKR321"
        },
        "4": {
            name: "",
            x: 464.67,
            y: 169.83,
            parent_id: "UKR4826"
        },
        "5": {
            name: "",
            x: 533.97,
            y: 90.45,
            parent_id: "UKR285"
        },
        "6": {
            name: "",
            x: 642.33,
            y: 125.73,
            parent_id: "UKR325"
        },
        "7": {
            name: "",
            x: 791.01,
            y: 246.69,
            parent_id: "UKR328"
        },
        "8": {
            name: "",
            x: 641.07,
            y: 231.57,
            parent_id: "UKR330"
        },
        "9": {
            name: "",
            x: 511.29,
            y: 270.63,
            parent_id: "UKR319"
        },
        "10": {
            name: "",
            x: 934.65,
            y: 294.57,
            parent_id: "UKR329"
        },
        "11": {
            name: "",
            x: 264.33,
            y: 245.43,
            parent_id: "UKR290"
        },
        "12": {
            name: "",
            x: 189.99,
            y: 259.29,
            parent_id: "UKR292"
        },
        "13": {
            name: "",
            x: 566.73,
            y: 342.45,
            parent_id: "UKR320"
        },
        "14": {
            name: "",
            x: 697.77,
            y: 332.37,
            parent_id: "UKR326"
        },
        "15": {
            name: "",
            x: 744.39,
            y: 436.95,
            parent_id: "UKR331"
        },
        "16": {
            name: "",
            x: 855.27,
            y: 382.77,
            parent_id: "UKR327"
        },
        "17": {
            name: "",
            x: 634.77,
            y: 482.31,
            parent_id: "UKR4827"
        },
        "18": {
            name: "",
            x: 539.01,
            y: 423.09,
            parent_id: "UKR284"
        },
        "19": {
            name: "",
            x: 444.51,
            y: 444.51,
            parent_id: "UKR322"
        },
        "20": {
            name: "",
            x: 360.09,
            y: 302.13,
            parent_id: "UKR323"
        },
        "21": {
            name: "",
            x: 205.11,
            y: 357.57,
            parent_id: "UKR288"
        },
        "22": {
            name: "",
            x: 133.29,
            y: 322.29,
            parent_id: "UKR289"
        },
        "23": {
            name: "",
            x: 56.43,
            y: 342.45,
            parent_id: "UKR293"
        },
        "24": {
            name: "",
            x: 90.45,
            y: 232.83,
            parent_id: "UKR291"
        }
    },
    legend: {
        entries: []
    },
    regions: {
        "0": {
            states: [],
            zoomable: "0"
        }
    },
    data: {
        data: {}
    }
};

for (var labelItem in simplemaps_countrymap_mapdata.labels) {
    for (var stateName in simplemaps_countrymap_mapdata.state_specific) {
        if (stateName == simplemaps_countrymap_mapdata.labels[labelItem].parent_id) {
            simplemaps_countrymap_mapdata.labels[labelItem].name = simplemaps_countrymap_mapdata.state_specific[stateName].description;
        }
    }
}