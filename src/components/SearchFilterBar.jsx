import { Box, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Switch, Typography } from "@mui/material";
import { Search as SearchIcon, Star as StarIcon } from "@mui/icons-material";

const SearchFilterBar = ({ 
  search, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange 
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
      <TextField
        fullWidth
        placeholder="Search by company or role..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        }}
        sx={{ 
          flexGrow: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "background.paper",
          }
        }}
      />
      <FormControl sx={{ minWidth: { sm: 200 } }}>
        <InputLabel id="status-filter-label">All Statuses</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={statusFilter}
          label="All Statuses"
          onChange={(e) => onStatusFilterChange(e.target.value)}
          sx={{ borderRadius: 3, bgcolor: "background.paper" }}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="Applied">Applied</MenuItem>
          <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
          <MenuItem value="Selected">Selected</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Follow Up">Follow Up</MenuItem>
        </Select>
      </FormControl>
    </Box>
    
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 0.5 }}>
      <FormControlLabel
        control={
          <Switch 
            checked={priorityFilter} 
            onChange={(e) => onPriorityFilterChange(e.target.checked)} 
            color="warning"
            size="small"
          />
        }
        label={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StarIcon sx={{ fontSize: 18, color: priorityFilter ? "warning.main" : "text.disabled" }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: priorityFilter ? "text.primary" : "text.secondary" }}>
              Priority Only
            </Typography>
          </Box>
        }
      />
      <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 600 }}>
        {search || statusFilter !== "all" || priorityFilter ? "Filters active" : ""}
      </Typography>
    </Box>
  </Box>
);

export default SearchFilterBar;

