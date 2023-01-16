import { Box } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

export default function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput.split(",").map((value) => value.trim())
        }
        quickFilterFormatter={(quickFilterValues) =>
          quickFilterValues.join(", ")
        }
        debounceMs={200} // time before applying the new quick filter value
      />
    </Box>
  );
}
