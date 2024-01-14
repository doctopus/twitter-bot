#!/usr/bin/env Rscript

# Load required libraries
library(ggplot2)
library(data.table)
library(argparse)
library(magick) #read image
library(cowplot) #draw over image

# Set up argparse
parser <- argparse::ArgumentParser()
parser$add_argument("--csvFile")
args <- parser$parse_args()

# Read in the image file
img <- image_read("Canvas1500x500.png")
# Get image dimensions
info <- image_info(img)
img_width <- info$width
img_height <- info$height

# Read the data from the CSV file
df <- fread("plotCoin.csv")



# Convert the date column to a date object
df$date <- as.Date(df$date)

# Create the plot using ggplot2
p <- ggplot(df, aes(date, price)) +
  geom_line(col="#B14152", lty="solid", linewidth=0.2) +
  labs(title = "Bitcoin Price", x = "Date", y = "Price (USD)") +
  theme_minimal() +
  theme(plot.title = element_text(hjust = 0.5),
        axis.title = element_text(size = 12),
        axis.text = element_text(size = 10),
        plot.background= element_rect(fill='transparent', color=NA),#transparent panel bg
        panel.grid.major = element_blank(), #remove major gridlines
        panel.grid.minor = element_blank(), #remove minor gridlines
        legend.background = element_rect(fill='transparent'), #transparent legend bg
        legend.box.background = element_rect(fill='transparent')) #transparent legend panel

plot <-ggdraw() +
  draw_image(img) +
  draw_plot(p)

ggsave("Header1500x500.png", plot, dpi = 300, height = img_height, width = img_width, unit = 'px')
