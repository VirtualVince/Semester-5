package com.example.libmngr;

import android.content.Intent;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ListView listViewBooks;
    private FloatingActionButton fabAddBook;
    private DatabaseHelper dbHelper;
    private List<Book> bookList;
    private ArrayAdapter<Book> adapter;

    private static final int REQUEST_ADD_BOOK = 1;
    private static final int REQUEST_EDIT_BOOK = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listViewBooks = findViewById(R.id.listViewBooks);
        fabAddBook = findViewById(R.id.fabAddBook);

        dbHelper = new DatabaseHelper(this);
        bookList = new ArrayList<>();

        // Setup ListView
        loadBooks();

        // Setup adapter
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, bookList);
        listViewBooks.setAdapter(adapter);

        // Register for context menu (long press)
        registerForContextMenu(listViewBooks);

        // Click listener for editing
        listViewBooks.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Book book = bookList.get(position);
                Intent intent = new Intent(MainActivity.this, AddEditBookActivity.class);
                intent.putExtra("BOOK", book);
                intent.putExtra("MODE", "EDIT");
                startActivityForResult(intent, REQUEST_EDIT_BOOK);
            }
        });

        // FAB click listener for adding
        fabAddBook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, AddEditBookActivity.class);
                intent.putExtra("MODE", "ADD");
                startActivityForResult(intent, REQUEST_ADD_BOOK);
            }
        });
    }

    private void loadBooks() {
        bookList.clear();
        bookList.addAll(dbHelper.getAllBooks());
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        menu.setHeaderTitle("Select Action");
        menu.add(0, 1, 0, "Edit");
        menu.add(0, 2, 0, "Delete");
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();
        int position = info.position;
        Book book = bookList.get(position);

        switch (item.getItemId()) {
            case 1: // Edit
                Intent intent = new Intent(MainActivity.this, AddEditBookActivity.class);
                intent.putExtra("BOOK", book);
                intent.putExtra("MODE", "EDIT");
                startActivityForResult(intent, REQUEST_EDIT_BOOK);
                return true;

            case 2: // Delete
                dbHelper.deleteBook(book.getId());
                loadBooks();
                adapter.notifyDataSetChanged();
                Toast.makeText(this, "Book deleted", Toast.LENGTH_SHORT).show();
                return true;

            default:
                return super.onContextItemSelected(item);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK) {
            loadBooks();
            adapter.notifyDataSetChanged();

            if (requestCode == REQUEST_ADD_BOOK) {
                Toast.makeText(this, "Book added successfully", Toast.LENGTH_SHORT).show();
            } else if (requestCode == REQUEST_EDIT_BOOK) {
                Toast.makeText(this, "Book updated successfully", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_about) {
            Toast.makeText(this, "Library Manager v1.0\nTotal Books: " +
                    dbHelper.getBookCount(), Toast.LENGTH_LONG).show();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}