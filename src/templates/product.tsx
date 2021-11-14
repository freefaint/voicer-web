
import React, { useCallback } from "react";

import { Grid, FormControl } from "@material-ui/core";

import { Template } from "types/registry/template";
import { Product } from "types/product";

import { TextField } from "components/domain";

export const ProductTemplate = ({ item, errors, creating, editing, onChange }: Template<Product>) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...item, [e.currentTarget.name]: e.currentTarget.value })
  }, [item, onChange]);

  return (
    <div style={{ margin: "2rem 1.5rem" }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="ID"
              name="id"
              error={!!errors?.find(i => i.name === 'id')}
              helperText={errors?.find(i => i.name === 'id')?.text}
              value={item.id}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Имя"
              name="name"
              error={!!errors?.find(i => i.name === 'name')}
              helperText={errors?.find(i => i.name === 'name')?.text}
              value={item.name}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Стоимость"
              name="cost"
              error={!!errors?.find(i => i.name === 'cost')}
              helperText={errors?.find(i => i.name === 'cost')?.text}
              value={item.cost}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Вес"
              name="wight"
              error={!!errors?.find(i => i.name === 'weight')}
              helperText={errors?.find(i => i.name === 'weight')?.text}
              value={item.weight}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Категория"
              name="category"
              error={!!errors?.find(i => i.name === 'category')}
              helperText={errors?.find(i => i.name === 'category')?.text}
              value={item.category}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Возраст"
              name="age"
              error={!!errors?.find(i => i.name === 'age')}
              helperText={errors?.find(i => i.name === 'age')?.text}
              value={item.age}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Описание"
              name="description"
              error={!!errors?.find(i => i.name === 'description')}
              helperText={errors?.find(i => i.name === 'description')?.text}
              value={item.description}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Картинка"
              name="img"
              error={!!errors?.find(i => i.name === 'img')}
              helperText={errors?.find(i => i.name === 'img')?.text}
              value={item.img}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              readOnly={!editing}
              required={true}
              label="Названия"
              name="namrs"
              error={!!errors?.find(i => i.name === 'names')}
              helperText={errors?.find(i => i.name === 'names')?.text}
              value={item.names}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}