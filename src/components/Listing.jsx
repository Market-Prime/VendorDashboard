import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Listing = ({
  ListItemComponent, // Custom component for rendering each list item
  listItemsProp = [], // Initial list of items
  loadFunction, // Function to fetch data
  refreshFunction, // Function to refresh the list
}) => {
  const [listItems, setListItems] = useState(listItemsProp);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await loadFunction();
        setListItems(data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [loadFunction]);

  // Refresh the list
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await refreshFunction();
      setListItems(data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Listing</h2>
        <button
          onClick={handleRefresh}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
            isRefreshing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isRefreshing}
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : listItems.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No items found.</div>
      ) : (
        // List Items
        <ul className="space-y-4">
          {listItems.map((item, index) => (
            <li key={index}>
              <ListItemComponent {...item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Prop validation using PropTypes
Listing.propTypes = {
  ListItemComponent: PropTypes.elementType.isRequired, // Must be a valid React component
  listItemsProp: PropTypes.arrayOf(PropTypes.object), // Must be an array of objects
  loadFunction: PropTypes.func.isRequired, // Must be a function
  refreshFunction: PropTypes.func.isRequired, // Must be a function
};

// Default props for optional props
Listing.defaultProps = {
  listItemsProp: [], // Default to an empty array
};

export default Listing;
