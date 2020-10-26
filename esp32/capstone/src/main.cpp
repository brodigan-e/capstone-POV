#include <Arduino.h>
#include <FastLED.h>
#include <FreeRTOS.h>

#ifdef DEBUG
#define DEBUG_PRINT(x) Serial.println(x)
#else
#define DEBUG_PRINT(x)
#endif

const int NUM_ANGULAR_SEGMENTS = 120; // 3 degree segments
const int NUM_LEDS = 144;
const int NUM_LEDS_ARM = 36; // 144 leds total/4 arms

const int LED_CLK_PIN = 27;  // gpio #27
const int LED_DATA_PIN = 15; //gpio #15
const int HES_SIG_PIN = A2; // gpi #34

// can't be named RGB, conflicts with fastLED library
typedef struct RGBData 
{
    int r;
    int g;
    int b;
} RGBData;

typedef struct ImageFrameData
{
    // array of RGB values for LEDs
    RGBData ledValues[NUM_LEDS_ARM][NUM_ANGULAR_SEGMENTS];
    // indicates if this frame is different than the previously sent frame
    boolean frameChanged;
     // indicates whether frame is part of animation or not
    boolean animation;
} ImageFrameData;

float g_currentRpm;
volatile boolean g_newRotation;

// used for calculating RPM
volatile unsigned int g_revolutions;
unsigned long g_prevTimeMs;
unsigned int g_revsPerMs;
unsigned long g_timePerSegmentMs; // time for arms to rotate 90deg

// led values array
CRGB g_leds[NUM_LEDS];

TaskHandle_t ImageDisplayTask;
TaskHandle_t CommunicationTask;
QueueHandle_t imageFrameQueue;

void setup()
{
    g_currentRpm = 0;
    g_newRotation = false;
    g_revolutions = 0;
    g_prevTimeMs = 0;
    g_revsPerMs = 0;
    g_timePerSegmentMs = 0;

    pinMode(HES_SIG_PIN, INPUT);

    Serial.begin(115200);

    // pin image display task to core 0
    xTaskCreatePinnedToCore(Task_ImageDisplay, "ImageDisplayTask", 10000, NULL, 0,
                            &ImageDisplayTask, 0);
    // pin communication task to core 1
    xTaskCreatePinnedToCore(Task_Communication, "CommunicationTask", 10000, NULL, 0,
                            &CommunicationTask, 0);

    // queue for sending image frames between tasks
    imageFrameQueue = xQueueCreate(5, sizeof(ImageFrameData));
    if (imageFrameQueue == NULL)
    {
        Serial.println("Error: queue couldn't be created");
    }

    attachInterrupt(HES_SIG_PIN, HallEffectSensor_ISR, RISING);

    FastLED.addLeds<APA102, LED_DATA_PIN, LED_CLK_PIN, BGR>(g_leds, NUM_LEDS);
}

void Task_ImageDisplay(void *parameter)
{
    for (;;) // infinite loop
    {
        // queue receive

        // update params
        CalculateRPM();
        
        while (!g_newRotation)
        {
            g_newRotation = false;

            
            // display image on LEDS
        }
    }
}

void Task_Communication(void *parameter)
{
    for (;;) // infinite loop
    {

        // queue send
    }
}

void IRAM_ATTR HallEffectSensor_ISR()
{
    g_newRotation = true;
    g_revolutions++;
}

void CalculateRPM()
{
    // do new calculation every 5 revolutions
    if (g_revolutions >= 5)
    {
        g_revsPerMs = g_revolutions/(millis() - g_prevTimeMs);
        g_prevTimeMs = millis();
        g_revolutions = 0;

        g_currentRpm = g_revsPerMs * 60000;
        g_timePerSegmentMs = (1/g_revsPerMs) / 4;
    }
}