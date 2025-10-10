package com.example.a1_vincente_sequeira;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.textfield.TextInputEditText;
import java.text.DecimalFormat;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private TextInputEditText editTextHours, editTextRate;
    private TextView textViewPay, textViewOvertimePay, textViewTotalPay, textViewTax;
    private Button buttonCalculate;
    private DecimalFormat df = new DecimalFormat("#.##");
    public static ArrayList<String> paymentList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editTextHours = findViewById(R.id.editTextHours);
        editTextRate = findViewById(R.id.editTextRate);
        textViewPay = findViewById(R.id.textViewPay);
        textViewOvertimePay = findViewById(R.id.textViewOvertimePay);
        textViewTotalPay = findViewById(R.id.textViewTotalPay);
        textViewTax = findViewById(R.id.textViewTax);
        buttonCalculate = findViewById(R.id.buttonCalculate);

        buttonCalculate.setOnClickListener(v -> calculatePayment());
    }

    private void calculatePayment() {
        String hoursStr = editTextHours.getText().toString().trim();
        String rateStr = editTextRate.getText().toString().trim();

        if (hoursStr.isEmpty() || rateStr.isEmpty()) {
            Toast.makeText(this, "Error: Please fill in all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            double hours = Double.parseDouble(hoursStr);
            double rate = Double.parseDouble(rateStr);

            if (hours < 0 || rate < 0) {
                Toast.makeText(this, "Error: Values must be positive", Toast.LENGTH_SHORT).show();
                return;
            }

            double regularPay;
            double overtimePay = 0;
            double totalPay;

            if (hours <= 40) {
                regularPay = hours * rate;
                totalPay = regularPay;
            } else {
                regularPay = 40 * rate;
                overtimePay = (hours - 40) * rate * 1.5;
                totalPay = regularPay + overtimePay;
            }

            double tax = totalPay * 0.18;

            textViewPay.setText("Pay: $" + df.format(regularPay));
            textViewOvertimePay.setText("Overtime Pay: $" + df.format(overtimePay));
            textViewTotalPay.setText("Total Pay: $" + df.format(totalPay));
            textViewTax.setText("Tax: $" + df.format(tax));

            String paymentEntry = "Hours: " + hours + " | Rate: $" + rate +
                    " | Total: $" + df.format(totalPay);
            paymentList.add(paymentEntry);

            // Show success message
            Toast.makeText(this, "Success: Payment calculated!", Toast.LENGTH_SHORT).show();

        } catch (NumberFormatException e) {
            Toast.makeText(this, "Error: Invalid number format", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.menu_detail) {
            // Navigate to DetailActivity
            startActivity(new android.content.Intent(this, DetailActivity.class));
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}