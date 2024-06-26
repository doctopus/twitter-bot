# Load required libraries
library(ggplot2)
library(data.table)

# Define directories
input_dir <- dirname(normalizePath(commandArgs(trailingOnly = TRUE)[1]))
output_dir <- dirname(normalizePath(commandArgs(trailingOnly = TRUE)[2]))
input_file <- file.path(input_dir, "plotCoin.csv")

# Read the data from the CSV file
df <- fread(input_file)

# Convert the date column to a date object
df$date <- as.Date(df$date)

# Create the plot using ggplot2
p <- ggplot(df, aes(date, price)) +
  geom_line(col="#B14152", linetype="solid", linewidth=0.2) +
  labs(title = "Bitcoin Price", x = "Date", y = "Price (USD)") +
  theme_minimal() +
  theme(plot.title = element_text(hjust = 0.5),
        axis.title = element_text(size = 12),
        axis.text = element_text(size = 10),
        plot.background = element_rect(fill='transparent', color=NA),
        panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        legend.background = element_rect(fill='transparent'),
        legend.box.background = element_rect(fill='transparent'))

# Save the plot as a 1500x500 pixel image
ggsave(file.path(output_dir, "Header1500x500.png"), p, dpi = 300, height = 500/300, width = 1500/300)
