CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



-- here is the organization table
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    location VARCHAR(255),
    website VARCHAR(255),
    num_employees INTEGER,
    contact_email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for better query performance
CREATE INDEX idx_organizations_user_id ON organizations(user_id);

-- Create an index on created_at for sorting
CREATE INDEX idx_organizations_created_at ON organizations(created_at);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_location VARCHAR(255),
    event_description TEXT,
    event_organizer VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_event_date ON events(event_date);


-- CURRENT SCHEMA FINAL
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.contacts_old (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  address text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  user_id text,
  CONSTRAINT contacts_old_pkey PRIMARY KEY (id)
);
CREATE TABLE public.events (
  user_id text NOT NULL,
  event_name character varying NOT NULL,
  event_organizer character varying,
  event_date date NOT NULL,
  event_location character varying,
  event_description text,
  event_notes text,
  id integer NOT NULL DEFAULT nextval('events_id_seq1'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.events_old (
  user_id text NOT NULL,
  event_name character varying NOT NULL,
  event_location character varying,
  event_description text,
  event_organizer character varying,
  id integer NOT NULL DEFAULT nextval('events_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  event_date text NOT NULL,
  CONSTRAINT events_old_pkey PRIMARY KEY (id)
);
CREATE TABLE public.organizations (
  user_id text NOT NULL,
  organization_name character varying NOT NULL,
  organization_logo character varying,
  organization_industry character varying,
  organization_location character varying,
  organization_website character varying,
  organization_contact_email character varying,
  organization_notes text,
  id integer NOT NULL DEFAULT nextval('organizations_id_seq1'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT organizations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.organizations_events (
  organization_id integer,
  event_id integer,
  role character varying,
  notes text,
  id integer NOT NULL DEFAULT nextval('organizations_events_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT organizations_events_pkey PRIMARY KEY (id),
  CONSTRAINT organizations_events_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id),
  CONSTRAINT organizations_events_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);
CREATE TABLE public.organizations_old (
  user_id text NOT NULL,
  name character varying NOT NULL,
  industry character varying,
  location character varying,
  website character varying,
  num_employees integer,
  contact_email character varying,
  notes text,
  id integer NOT NULL DEFAULT nextval('organizations_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT organizations_old_pkey PRIMARY KEY (id)
);
CREATE TABLE public.people (
  user_id text NOT NULL,
  person_name character varying NOT NULL,
  person_photo character varying,
  person_role character varying,
  person_email character varying,
  person_phone character varying,
  person_location character varying,
  person_linkedin character varying,
  person_notes text,
  organization_id integer,
  id integer NOT NULL DEFAULT nextval('people_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT people_pkey PRIMARY KEY (id),
  CONSTRAINT people_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);
CREATE TABLE public.people_events (
  person_id integer,
  event_id integer,
  relationship_type character varying,
  notes text,
  id integer NOT NULL DEFAULT nextval('people_events_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT people_events_pkey PRIMARY KEY (id),
  CONSTRAINT people_events_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id),
  CONSTRAINT people_events_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id)
);
CREATE TABLE public.people_organizations (
  person_id integer,
  organization_id integer,
  relationship_type character varying,
  notes text,
  id integer NOT NULL DEFAULT nextval('people_organizations_id_seq'::regclass),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT people_organizations_pkey PRIMARY KEY (id),
  CONSTRAINT people_organizations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT people_organizations_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id)
);
CREATE TABLE public.waitlist (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text UNIQUE,
  CONSTRAINT waitlist_pkey PRIMARY KEY (id)
);

-- SQL QUERY TO ADD ORGANIZATION_ID FIELD TO PEOPLE TABLE
-- Run this query to add the organization_id field to your existing people table:

ALTER TABLE public.people 
ADD COLUMN organization_id integer,
ADD CONSTRAINT people_organization_id_fkey 
FOREIGN KEY (organization_id) REFERENCES public.organizations(id);

-- Create an index on organization_id for better query performance
CREATE INDEX idx_people_organization_id ON public.people(organization_id);