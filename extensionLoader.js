//------------------------------------
// Oracle COE - Cross CX - Innovations
// jose.antonio.juarez@oracle.com
// louis.albers@oracle.com
// Malaga // Spain // 2021
//------------------------------------

(function() {
    var appName = "COE_OSvC_Sentiment_Iconizer"; //BUI Extension name
    var appVersion = "1.0"; //BUI Extension version
    var High_Icon, High_Color, Medium_Icon, Medium_Color, Low_Icon, Low_Color;

    function init() {
        ORACLE_SERVICE_CLOUD.extension_loader.load(appName, appVersion).then(function(sdk) { //BUI SDK
            sdk.getGlobalContext().then(function(globalContext) {
                globalContext.getExtensionContext(appName)
                    .then(function(extensionContext) { //Get BUI Extension configuration values (properties.json)
                        extensionContext.getProperties(['Sentiment_Field_Name', 'High_Icon', 'High_Color', 'Medium_Icon', 'Medium_Color', 'Low_Icon', 'Low_Color'])
                            .then(function(collection) {
                                const Sentiment_Field_Name = collection.get('Sentiment_Field_Name');
                                High_Icon = collection.get('High_Icon').getValue();
                                High_Color = collection.get('High_Color').getValue();
                                Medium_Icon = collection.get('Medium_Icon').getValue();
                                Medium_Color = collection.get('Medium_Color').getValue();
                                Low_Icon = collection.get('Low_Icon').getValue();
                                Low_Color = collection.get('Low_Color').getValue();
                                const elementCollection = window.parent.document.querySelectorAll("input[id*='" + Sentiment_Field_Name.getValue() + "']");
                                [].forEach.call(elementCollection, (e) => {
                                    iconize(e);
                                    e.addEventListener('change', function(event) { iconize(this); });
                                })
                            });
                    }).catch(function(error) {
                        console.log('ERROR ' + appName + ": " + JSON.stringify(error));
                    });
            });
        });
    }

    function iconize(e, collection) {
        console.log(appName + " Iconizing: " + e.id);
        try {
            e.parentElement.removeChild(e.parentElement.querySelector('.sentimentIconizer'));
        } catch (error) {
            //First time iconizing, nothing to remove
        }
        try {
            var icon = document.createElement('span');
            icon.classList.add('sentimentIconizer');
            const sentValue = parseInt(e.value);
            if (sentValue > 49) {
                icon.classList.add(High_Icon);
                icon.style.color = High_Color;
            }
            if (sentValue < 50 && sentValue > -51) {
                icon.classList.add(Medium_Icon);
                icon.style.color = Medium_Color;
            }
            if (sentValue < -50) {
                icon.classList.add(Low_Icon);
                icon.style.color = Low_Color;
            }
            icon.style.fontSize = '25px';
            icon.style.position = 'absolute';
            icon.style.right = '6px';
            icon.style.top = '-8px';
            e.parentElement.appendChild(icon);
        } catch (error) {
            console.log('ERROR ' + appName + ": " + JSON.stringify(error));
        }
    }
    sentimentIconizer = {
        init
    };
})();
sentimentIconizer.init();