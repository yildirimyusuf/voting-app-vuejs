<template>
  <form
    class="columns is-centered is-marginless"
    @submit.prevent="handleSubmit">
    <div
      class="column"
      style="max-width: 512px">
      <base-header>Get Started Creating Polls Today!</base-header>

      <div class="field">
        <label
          class="label"
          for="name">
          Name
        </label>
        <div class="control has-icons-left">
          <input
            v-model="name"
            @input="$v.name.$touch"
            class="input"
            :class="{ 'is-danger': $v.name.$error }"
            type="text"
            name="name"
            placeholder="Name"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </div>
        <div v-show="$v.name.$error">
          <p
            v-show="!$v.name.required"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Name is required' }}
          </p>
          <p
            v-show="!$v.name.minLength"
            class="help is-danger"
          >
            <i class="fas fa-exclamation-triangle" />
            {{ 'Invalid name' }}
          </p>
        </div>
      </div>

      <div class="field">
        <label
          class="label"
          for="email">
          Email
        </label>
        <div class="control has-icons-left">
          <input
            v-model="email"
            @input="$v.email.$touch"
            class="input"
            :class="{ 'is-danger': $v.email.$error }"
            type="email"
            name="email"
            placeholder="Email"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-envelope" />
          </span>
        </div>
        <p
          v-show="!$v.email.required"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Email is required' }}
        </p>
        <p
          v-show="!$v.email.email"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Invalid email' }}
        </p>
      </div>

      <div class="field">
        <label
          class="label"
          for="password">
          Password
        </label>
        <div class="control has-icons-left">
          <input
            v-model="password"
            @input="$v.password.$touch"
            class="input"
            :class="{ 'is-danger': $v.password.$error }"
            type="password"
            name="password"
            placeholder="Password"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-unlock-alt" />
          </span>
        </div>
        <p
          v-show="!$v.password.required"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Password is required' }}
        </p>
        <p
          v-show="!$v.password.minLength"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Password must be at least 8 characters in length' }}
        </p>
        <p
          v-show="!$v.password.sameAsConfirmPassword"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Passwords do not match' }}
        </p>
      </div>

      <div class="field">
        <label
          class="label"
          for="confirmPassword">
          Confirm Password
        </label>
        <div class="control has-icons-left">
          <input
            v-model="confirmPassword"
            @input="$v.confirmPassword.$touch"
            class="input"
            :class="{ 'is-danger': $v.confirmPassword.$error }"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-unlock-alt" />
          </span>
        </div>
        <p
          v-show="$v.confirmPassword.required"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Password is required' }}
        </p>
        <p
          v-show="$v.confirmPassword.minLength"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Password must be at least 8 characters in length' }}
        </p>
        <p
          v-show="$v.confirmPassword.sameAsPassword"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ 'Passwords do not match' }}
        </p>
        <p
          v-show="authError"
          class="help is-danger"
        >
          <i class="fas fa-exclamation-triangle" />
          {{ authError }}
        </p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-success is-link"
            type="submit"
          >
            Register
          </button>
        </div>
        <div class="control">
          <router-link
            to="/"
            class="button is-danger is-link">
            Cancel
          </router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import BaseHeader from '@/components/BaseHeader'

export default {
  components: {
    BaseHeader
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      authError: ''
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(2)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      sameAsConfirmPassword: sameAs('confirmPassword')
    },
    confirmPassword: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    handleSubmit: async function() {
      try {
        if (this.$v.$invalid) return

        const { name, email, password, confirmPassword } = this.$data

        const response = await axios.post('/signup', {
          name,
          email,
          password,
          confirmPassword
        })

        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
          localStorage.setItem('token', response.token)
        } else {
          localStorage.setItem('token', response.token)
        }

        this.$router.push('/')
      } catch (err) {
        this.authError = err.response.data
      }
    }
  }
}
</script>