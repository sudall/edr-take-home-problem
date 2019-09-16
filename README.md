# EDR Take Home Problem

## Demo

https://infallible-villani-060a8a.netlify.com/

## How to use

Install it and run:

```sh
yarn
yarn start
```

## Design

Search Data:

My first thought is to collect the parameters needed to perform the search:

```
type SearchParams = {
    // https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
    latLongBounds: {
        southWest: LatLong;
        northEast: LatLong;
    };
    vehicle: {
        make: Make;
        model: Model;
        year?: number;
    };
    wholeVehicle: {
        condition?: Condition;
        price?: number;
    };
    parts?: Part[];
    // can contain name and/or address of a refurbisher
    searchText?: string;
    sortBy?: SortBy;
    sortDescending?: boolean;
};

type Part = {
    // engine, exhaust, cooling system, wheels, etc
    partType: PartType;
    price?: number;
};
```

You'd also need a database of known vehicles and parts in order to fill in the form field options.

User Interface:

- Google Maps for the map component. This component would collect the latLongBounds.
    - Here's an example of how to use custom data with Google Maps: https://developers.google.com/maps/solutions/store-locator/clothing-store-locator
    - This looks like a decent React library for displaying markers on a google map: https://github.com/google-map-react/google-map-react
        - MIT license, so we're good to go.
        - Last commit on July 16 of this year, which tells me this library is likely not abandoned
    - Another library I looked at was https://github.com/tomchentw/react-google-maps
        - Last commit on Jan 4, 2018 and the demo does not function, which tells me this library might be abandoned.

- Basic vehicle information can be collected as such:
    - make: select list
    - model: select list showing only valid models for the selected make
    - year: select list showing only valid years for the selected model
    - year, make, model can also be parsed from the VIN so that could be an alternate way to collect those via a text input

- Checkboxes:
    - whole vehicle checkbox which adds fields needed to collect additional whole-vehicle information
    - checkbox for each part which adds fields needed to collect part information

- Whole vehicle information can be collected as such:
    - condition: select list
    - price: text input

- Part information can be collected as such:
    - price: text input
    
- Search text (Name or address) can be collected via a text input

- A button to switch between a list view of the results and a map with a markers for each result.

- In a list view, sorting and sort direction can be collected with a select list
    - eg. "Highest average purchase price" (sortBy: average price, sortDescending: true), "Nearest" (sortBy: distance, sortDescending: false)

- One possible enhancement could be to add a filter based on a vehicle/part in inventory. So, you'd have a page where the inventory can be managed and on the search page, have an autocomplete search that can look-up parts/vehicles that you're trying to sell so that you only have to enter the details of the vehicle/part once.

Search Logic:

I'm thinking it's possible that selling the vehicle in parts to various refurbishers could end up being a better deal than selling the whole vehicle or set of parts to one refurbisher. However, it doesn't seem like this is something the tool needs to be optimized to figure out in a first iteration and could be a future enhancement. If this were to be implemented, you could treat a whole vehicle as equivalent to a set of all parts in the vehicle when calculating what refurbishers might pay, then display the breakdown (eg. sell for parts: $1500; sell as whole: $1000). You could have a single search result listing all refurbishers to sell each part to to maximize the sale amount.

To find refurbishers, I would filter refurbishers in this order:
    
- by the geographic area since that might slim down results the most. this can be figured out by checking if the location of the refurbisher falls within the search bounding box (location is greater than or equal to southWest boundary corner and location is less than or equal to northEast boundary corner)

- by full or partial name/address match, if name/address is provided. google places api could be used here and results cross-referenced with the refurbisher database since writing a good search algorithm here might be difficult. something like elastic search is another option.

- by whole vehicle and or part makes and models accepted. if whole vehicle and parts are specified, a refurbisher must be able to buy the whole vehicle and all parts specified. I would want to confirm this behavior before implementation.

- by price. the price specified for the whole vehicle or each part must be under the maximum price for the refurbisher, based on condition. I don't think it makes sense to filter out refurbishers if the price specified is below the minimum in the database. My assumption here is that a refurbisher would not realistically have a minimum they are willing to pay, rather maybe this number represents the lowest they have bought something for. I would want to confirm this behavior before implementation.

In list view, it seems like it would be most valuable to sort the refurbishers by the sum of the average prices ((min + max) / 2) for all parts/vehicles specified, by default. I would want to confirm this before implementation. Another sorting option could be by distance.






