import EmptyPlaceholder from "../../EmptyPlaceholder";
import ReadonlyItem from "../ReadonlyItem";
import "./ItemsReadonlyContainer.scss";

export default function ItemsReadonlyContainer({ currentItems, lists, displayError }) {
    return (
        <div className="grid flex-column flex-grow-1">
            {
                currentItems.length
                ? currentItems.map(
                    item => <ReadonlyItem key={ item._id } item={ item } lists={ lists } displayError={ displayError } />
                  )
                : <div className="col-12 flex flex-grow-1 flex-column justify-content-center align-content-center">
                      <EmptyPlaceholder
                          title={ "No items to display" }
                          subtitle={ "Items that have a due date will show up here." }
                          type={"items"}
                      />
                  </div>
            }
        </div>
    );
}
