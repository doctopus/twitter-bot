# plotCoin.R

# Load required libraries
library(ggplot2)
library(data.table)
library(magick)
library(cowplot)

# Define directories
input_dir <- dirname(normalizePath(commandArgs(trailingOnly = TRUE)[1]))
output_dir <- dirname(normalizePath(commandArgs(trailingOnly = TRUE)[2]))
input_file <- file.path(input_dir, "plotCoin.csv")

# Read in the image file
img <- magick::image_read(file.path(input_dir, "Canvas1500x500.png"))

# Get image dimensions
info <- image_info(img)
img_width <- info$width
img_height <- info$height

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

# Combine image and plot
plot <- ggdraw() +
  draw_image(img) +
  draw_plot(p)

# Save the final plot
ggsave(file.path(output_dir, "Header1500x500.png"), plot, dpi = 300, height = img_height, width = img_width, unit = 'px')
