# Project Overview
An Android application that calculates employee payments including overtime pay and tax deductions. The app features two activities: a main calculator interface and a payment history viewer.

## Features

### MainActivity
- Input Fields:
  - Number of hours worked
  - Hourly rate
- Calculations:
  - Regular pay (up to 40 hours)
  - Overtime pay (1.5x rate for hours beyond 40)
  - Total pay (regular + overtime)
  - Tax (18% of total pay)
- Validation:
  - Checks for empty fields
  - Validates positive numbers
  - Displays error messages via Toast
- Display:
  - Pay breakdown
  - Overtime pay
  - Total pay
  - Tax amount

### DetailActivity
- Payment History:
  - ListView displaying all calculated payments
  - Shows hours worked, hourly rate, and total pay for each entry
- Navigation:
  - Accessible via menu in MainActivity
  - Back button in ActionBar returns to MainActivity

## Payment Calculation Formula
If hours ≤ 40:  
    pay = hours × hourly_rate

If hours > 40:  
    regular_pay = 40 × hourly_rate  
    overtime_pay = (hours - 40) × hourly_rate × 1.5  
    pay = regular_pay + overtime_pay

tax = pay × 0.18

## Technical Details
- Language: Java
- Minimum SDK: API 24 (Android 7.0)
- Target SDK: API 34
- IDE: Android Studio
- Build System: Gradle

## Project Structure
app/  
├── src/main/  
│   ├── java/com/example/a1_vincente_sequeira/  
│   │   ├── MainActivity.java          # Main calculator activity  
│   │   └── DetailActivity.java        # Payment history list  
│   ├── res/  
│   │   ├── layout/  
│   │   │   ├── activity_main.xml      # Main UI layout  
│   │   │   └── activity_detail.xml    # List view layout  
│   │   ├── menu/  
│   │   │   └── main_menu.xml          # Options menu  
│   │   └── values/  
│   │       ├── strings.xml  
│   │       └── themes.xml  
│   └── AndroidManifest.xml

## Installation & Setup
Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/A1_Vincente_Sequeira.git
```
Open the project in Android Studio  
Wait for Gradle sync to complete  
Run the app on an emulator or physical device

## Usage
### Calculate Payment
- Enter the number of hours worked
- Enter the hourly rate
- Tap "Calculate Payment"
- View the calculated results below

### View Payment History
- Tap the three-dot menu (⋮) in the top-right corner
- Select "View Payments"
- Browse all previously calculated payments
- Tap the back arrow to return to the calculator

## Testing
The app has been tested for:
- ✅ Input validation (empty fields, negative numbers)
- ✅ Calculation accuracy (regular hours and overtime)
- ✅ Tax calculation (18% of total pay)
- ✅ Menu navigation to DetailActivity
- ✅ ListView display of payment history
- ✅ Back button functionality

## Requirements Met
- ✅ Two activities (MainActivity and DetailActivity)
- ✅ Menu implementation with navigation
- ✅ Back button in ActionBar (configured via AndroidManifest)
- ✅ Input validation and error handling
- ✅ Payment calculation with overtime logic
- ✅ Tax calculation
- ✅ Results display
- ✅ ListView showing payment history
- ✅ Toast/dialog messages for success and errors
