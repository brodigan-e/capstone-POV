import sys

from PIL import Image

size = 35, 35
angular_segments_count = 120
angular_segments = 360 / angular_segments_count
size_over_2 = int(size[0]/2)


def process_image_for_mcu(image_file):
    image = Image.open(image_file)
    image.thumbnail(size)

    output_pixels = []
    for j in range(size[0]):
        output_pixels.append([])

    for theta in range(angular_segments_count):
        copied_image = image.copy()
        rotated_image = copied_image.rotate((360/angular_segments_count) * theta)
        pixels = list(rotated_image.getdata())[(size[0] * size_over_2):(size[0] * size_over_2) + size[0]]
        for i in range(len(pixels)):
            output_pixels[i].append(pixels[i])

    return output_pixels


def process_full_size_image_and_dump_to_file(image_file_path, destination_path):
    rgb_data = process_image_for_mcu(image_file_path)
    dump_image_data_to_file(rgb_data, destination_path)


def dump_image_data_to_file(rgb_data, file_path):
    with open(file_path, "w") as file:
        for row in rgb_data:
            pixel_strings = list(map(lambda pixel: f'({pixel[0]},{pixel[1]},{pixel[2]})', row))
            rgb_data_through_rotation_for_pixel = ','.join(pixel_strings) + '\n'
            file.write(rgb_data_through_rotation_for_pixel)


def print_pixels_as_mcu_code(rgb_data):
    # Construct a C-style array initialization line for each row of the pixels
    crgb_array_literal_rows = list()
    for row in rgb_data:
        crgbSrings = list(map(lambda pixel: f'CRGB({pixel[0]},{pixel[1]},{pixel[2]})', row))
        crgb_array_literal_rows.append('{' + ','.join(crgbSrings) + '}')

    # Print the C-struct initialization statement and join all the array initialization literals together
    print('.ledValues = {')
    print(',\n'.join(crgb_array_literal_rows))
    print('}')


if __name__ == '__main__':
    the_pixels = process_image_for_mcu(sys.argv[1])
    print_pixels_as_mcu_code(the_pixels)
