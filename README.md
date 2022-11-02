## Controllable Tab Container
Tab container that allows dynamically controlling which tab is shown by default and other tabs are NOT rendered when hidden.

![demo image](https://github.com/bsgriggs/mendix-controllable-tab-container/blob/media/demo.png)

## Features
- Can use a parameter to control which tab is shown
- Content the is not from the current tab is NOT rendered (performance optimization)
- The list of tabs can either be static or dynamically controlled by a data source
- Configure the position of the tabs relative to the tab's content (top, right, bottom, left)
- The sorting of the tabs can be dynamically controlled
- Each tab can have a badge with brand styling
- The caption for each tab can either be Text, HTML, or configured in the mendix ui

## Usage
![tabs-static](https://github.com/bsgriggs/mendix-controllable-tab-container/blob/media/tabs-static.png)
1. If you need to have the tab container controlled by another object, set the Default Tab Index. The first tab is index 0. When the default tab index is changed by another widget (like a button), the tab container will automatically update, but the tab container **will not automitcally update the parent's attribute**. In this case, you will need to use On Click actions.
2. Decide whether you need to have a static list of tabs or a dynamic list based on data source. 

#### Static
3. Add a new tab to the list  
![tabs-static-item](https://github.com/bsgriggs/mendix-controllable-tab-container/blob/media/tabs-static-item.png)  
4. Select the Type of caption you'd like to display and enter the necessary value. If you select Custom, you will need to add content after closing the widget pop ups.
5. The badge will show as an icon to the right of the tab caption. It uses the branding color defined in the Style tab.
6. The On Click action can be used to set a parent object that controls the tab being shown but is not required.
7. Next, click "Save" and add the content for each tab you have added.

#### Dynamic
![tabs-dynamic](https://github.com/bsgriggs/mendix-controllable-tab-container/blob/media/tabs-static.png)  
3. Create a data source that returns objects like the following entity  
![dynamic-entity](https://github.com/bsgriggs/mendix-controllable-tab-container/blob/media/dynamic-entity.png)  
4. Set the Caption type to either Text or HTML
5. Set Caption Text / Caption HTML and Tab Badge to the attributes from the entity above. It uses the branding color defined in the Style tab.
6. The On Click action can be used to set a parent object that controls the tab being shown but is not required.
7. Next, click "Save" and add the content for the tab. This will have access to the Tab object, so use this object to determine what is shown in each tab.


#### Style
8. Set the Badge style to the brand color you would like to use.
9. Set tab direction as where you want the tabs to be listed in relation to the tab's content.  
![style](https://github.com/bsgriggs/mendix-controllable-tab-container/blob/media/style.png)  



## Demo project
https://widgettesting105-sandbox.mxapps.io/p/controllable-tab-container

## Issues, suggestions and feature requests
https://github.com/bsgriggs/mendix-controllable-tab-container/issues

## Development and contribution
Benjamin Griggs
