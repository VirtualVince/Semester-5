package com.example.libmngr;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class AddEditBookActivity extends AppCompatActivity {

    private EditText editTitle, editAuthor, editGenre, editYear;
    private Button btnSave, btnCancel;
    private DatabaseHelper dbHelper;
    private Book currentBook;
    private String mode;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_edit_book);

        // Initialize views
        editTitle = findViewById(R.id.editTitle);
        editAuthor = findViewById(R.id.editAuthor);
        editGenre = findViewById(R.id.editGenre);
        editYear = findViewById(R.id.editYear);
        btnSave = findViewById(R.id.btnSave);
        btnCancel = findViewById(R.id.btnCancel);

        dbHelper = new DatabaseHelper(this);

        // Get mode and book data from intent
        mode = getIntent().getStringExtra("MODE");

        if ("EDIT".equals(mode)) {
            currentBook = (Book) getIntent().getSerializableExtra("BOOK");
            populateFields();
            setTitle("Edit Book");
        } else {
            setTitle("Add New Book");
        }

        // Save button click
        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                saveBook();
            }
        });

        // Cancel button click
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    private void populateFields() {
        if (currentBook != null) {
            editTitle.setText(currentBook.getTitle());
            editAuthor.setText(currentBook.getAuthor());
            editGenre.setText(currentBook.getGenre());
            editYear.setText(String.valueOf(currentBook.getYear()));
        }
    }

    private void saveBook() {
        String title = editTitle.getText().toString().trim();
        String author = editAuthor.getText().toString().trim();
        String genre = editGenre.getText().toString().trim();
        String yearStr = editYear.getText().toString().trim();

        // Validation
        if (title.isEmpty()) {
            editTitle.setError("Title is required");
            editTitle.requestFocus();
            return;
        }

        if (author.isEmpty()) {
            editAuthor.setError("Author is required");
            editAuthor.requestFocus();
            return;
        }

        if (genre.isEmpty()) {
            editGenre.setError("Genre is required");
            editGenre.requestFocus();
            return;
        }

        if (yearStr.isEmpty()) {
            editYear.setError("Year is required");
            editYear.requestFocus();
            return;
        }

        int year;
        try {
            year = Integer.parseInt(yearStr);
            if (year < 1000 || year > 2100) {
                editYear.setError("Please enter a valid year");
                editYear.requestFocus();
                return;
            }
        } catch (NumberFormatException e) {
            editYear.setError("Please enter a valid year");
            editYear.requestFocus();
            return;
        }

        if ("EDIT".equals(mode)) {
            // Update existing book
            currentBook.setTitle(title);
            currentBook.setAuthor(author);
            currentBook.setGenre(genre);
            currentBook.setYear(year);
            dbHelper.updateBook(currentBook);
        } else {
            // Add new book
            Book newBook = new Book(title, author, genre, year);
            dbHelper.addBook(newBook);
        }

        setResult(RESULT_OK);
        finish();
    }
}