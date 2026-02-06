package com.example.itemapi.service;

import com.example.itemapi.model.Item;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ItemService {

    private final List<Item> items = new ArrayList<>();
    private final AtomicInteger idCounter = new AtomicInteger(1);

    public Item addItem(Item item) {
        int id = idCounter.getAndIncrement();
        item.setId(id);
        items.add(item);
        return item;
    }

    public Item getItemById(int id) {
        for (Item item : items) {
            if (item.getId() == id) {
                return item;
            }
        }
        return null;
    }
}
