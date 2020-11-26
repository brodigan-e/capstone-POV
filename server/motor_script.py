from gpiozero import Motor

FORWARD_GPIO_PIN = 24
BACKWARD_GPIO_PIN = 23
ENABLE_GPIO_PIN = 25

motor = Motor(forward=FORWARD_GPIO_PIN, backward=BACKWARD_GPIO_PIN, enable=ENABLE_GPIO_PIN, pwm=False)

while True:
    motor.forward(1)
